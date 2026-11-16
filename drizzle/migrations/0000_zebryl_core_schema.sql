
-- ROLES
create type public.app_role as enum ('admin', 'user');
create type public.application_status as enum ('new','contacted','demo_scheduled','converted','rejected');
create type public.lead_status as enum ('new','contacted','discussion','proposal_sent','in_progress','completed','rejected');
create type public.message_status as enum ('new','read','replied','archived');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Read own profile or admin" on public.profiles for select to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Update own profile" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "Insert own profile" on public.profiles for insert to authenticated
  with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'user') on conflict do nothing;
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- CONTENT TABLES
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null default '',
  description text not null default '',
  technologies text[] not null default '{}',
  skills text[] not null default '{}',
  duration text,
  training_mode text,
  project_details text,
  icon text not null default 'GraduationCap',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  features text[] not null default '{}',
  icon text not null default 'Code2',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trainers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  designation text not null default '',
  experience text,
  expertise text[] not null default '{}',
  bio text,
  photo_path text,
  linkedin_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.referral_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_path text,
  website_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'student' check (kind in ('student','client')),
  name text not null,
  role_or_company text,
  feedback text not null,
  photo_path text,
  is_sample boolean not null default false,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  contact_email text,
  phone text,
  whatsapp text,
  linkedin_url text,
  instagram_url text,
  location text,
  founder_name text not null default 'Dharmendra Pandey',
  founder_title text not null default 'Founder & CEO, Zebryl',
  founder_bio text,
  founder_photo_path text,
  founder_linkedin_url text,
  home_academy_tracks text[] not null default '{}',
  home_tech_services text[] not null default '{}',
  updated_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['courses','services','trainers','referral_companies','testimonials','site_settings'] loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Admins manage %s" on public.%I for all to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t, t);
    execute format('create trigger touch_%s before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

create policy "Public read active courses" on public.courses for select to anon, authenticated using (is_active);
create policy "Public read active services" on public.services for select to anon, authenticated using (is_active);
create policy "Public read active trainers" on public.trainers for select to anon, authenticated using (is_active);
create policy "Public read active companies" on public.referral_companies for select to anon, authenticated using (is_active);
create policy "Public read published testimonials" on public.testimonials for select to anon, authenticated using (is_published);
create policy "Public read settings" on public.site_settings for select to anon, authenticated using (true);

-- SUBMISSION TABLES
create table public.course_applications (
  id uuid primary key default gen_random_uuid(),
  submission_key uuid not null unique,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 255),
  mobile text not null check (mobile ~ '^\+?[0-9 ]{10,16}$'),
  whatsapp text not null check (whatsapp ~ '^\+?[0-9 ]{10,16}$'),
  qualification text not null check (char_length(qualification) <= 120),
  job_status text not null check (char_length(job_status) <= 60),
  experience text not null check (char_length(experience) <= 60),
  course_id uuid references public.courses(id) on delete set null,
  course_name text not null check (char_length(course_name) <= 160),
  training_mode text not null check (char_length(training_mode) <= 60),
  linkedin_url text check (linkedin_url is null or char_length(linkedin_url) <= 300),
  resume_path text not null check (char_length(resume_path) <= 400),
  resume_name text check (resume_name is null or char_length(resume_name) <= 200),
  heard_from text not null check (char_length(heard_from) <= 80),
  referral_name text check (referral_name is null or char_length(referral_name) <= 120),
  status public.application_status not null default 'new',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  submission_key uuid not null unique,
  full_name text not null check (char_length(full_name) between 2 and 120),
  company_name text not null check (char_length(company_name) between 1 and 160),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 255),
  phone text not null check (phone ~ '^\+?[0-9 ]{10,16}$'),
  project_type text not null check (char_length(project_type) <= 120),
  description text not null check (char_length(description) between 20 and 5000),
  budget text not null check (char_length(budget) <= 60),
  timeline text not null check (char_length(timeline) <= 60),
  reference_website text check (reference_website is null or char_length(reference_website) <= 300),
  status public.lead_status not null default 'new',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  submission_key uuid not null unique,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 255),
  phone text check (phone is null or phone ~ '^\+?[0-9 ]{10,16}$'),
  inquiry_type text not null check (inquiry_type in ('academy','business','general')),
  message text not null check (char_length(message) between 10 and 3000),
  status public.message_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['course_applications','project_inquiries','contact_messages'] loop
    execute format('grant insert on public.%I to anon, authenticated', t);
    execute format('grant select, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Anyone can submit %s" on public.%I for insert to anon, authenticated with check (status = ''new'')', t, t);
    execute format('create policy "Admins read %s" on public.%I for select to authenticated using (public.has_role(auth.uid(), ''admin''))', t, t);
    execute format('create policy "Admins update %s" on public.%I for update to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t, t);
    execute format('create policy "Admins delete %s" on public.%I for delete to authenticated using (public.has_role(auth.uid(), ''admin''))', t, t);
    execute format('create trigger touch_%s before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

create policy "Anyone can submit application notes guard" on public.course_applications as restrictive for insert to anon, authenticated with check (admin_notes is null);
create policy "Anyone can submit inquiry notes guard" on public.project_inquiries as restrictive for insert to anon, authenticated with check (admin_notes is null);

create index on public.course_applications (created_at desc);
create index on public.project_inquiries (created_at desc);
create index on public.contact_messages (created_at desc);

-- STORAGE POLICIES
create policy "Anyone can upload resumes" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes' and lower(storage.extension(name)) in ('pdf','doc','docx'));
create policy "Admins read resumes" on storage.objects for select to authenticated
  using (bucket_id = 'resumes' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete resumes" on storage.objects for delete to authenticated
  using (bucket_id = 'resumes' and public.has_role(auth.uid(), 'admin'));

create policy "Anyone can view media" on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');
create policy "Admins upload media" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin')
    and lower(storage.extension(name)) in ('png','jpg','jpeg','webp','svg','gif'));
create policy "Admins update media" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete media" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

-- SEED CONTENT
insert into public.site_settings (id, founder_bio, home_academy_tracks, home_tech_services) values (1,
  'Dharmendra Pandey is the Founder & CEO of Zebryl. As an SDET and software testing trainer, he leads Zebryl''s mission of making learners industry-ready and helping businesses build reliable digital products.',
  array['Full Stack Development','Automation Testing with AI','Manual and API Testing','Playwright Automation with JavaScript','Selenium Automation with Java','AI and LLM Development','AI Agent Development','DevOps and Cloud Computing','Spoken English and Professional Communication'],
  array['Website Development','Web Application Development','Mobile Application Development','Full Stack Development','AI Agent Development','AI Chatbot Development','LLM Integration','Business Process Automation','API Development and Integration','E-commerce Development','UI/UX Design','Software Testing and QA Automation']
);

insert into public.courses (slug, title, short_description, description, technologies, skills, training_mode, project_details, icon, sort_order) values
('full-stack-development','Full Stack Development','Build complete, production-grade web applications from front end to back end.',
 'Learn to design, build and deploy modern web applications end to end — responsive interfaces, secure APIs, databases and cloud deployment — the way real product teams work.',
 array['HTML','CSS','JavaScript','TypeScript','React','Node.js','Express','REST APIs','SQL','MongoDB','Git','Cloud Deployment'],
 array['Responsive UI development','Component-driven front-end architecture','REST API design','Database modelling','Authentication & security basics','Deploying to the cloud'],
 'Live online classes','Build and deploy a full-stack application with authentication, a database and an admin dashboard.','Layers',1),
('automation-testing-with-ai','Automation Testing with AI','Modern test automation accelerated by AI-assisted tooling.',
 'Master test automation and learn how AI tools speed up test design, script generation, maintenance and reporting — a skill set teams are actively hiring for.',
 array['Playwright','JavaScript','TypeScript','Selenium','Java','AI coding assistants','CI/CD','Git'],
 array['Automation framework design','AI-assisted test generation','Cross-browser testing','CI pipeline integration','Reporting & debugging'],
 'Live online classes','Automate a real web application with an AI-assisted Playwright framework running in CI.','Bot',2),
('software-testing','Software Testing (Manual, API and Automation)','Complete QA career track — from manual fundamentals to API and automation.',
 'A structured QA programme covering testing fundamentals, test design, defect management, API testing and UI automation with both Selenium (Java) and Playwright (JavaScript).',
 array['Manual Testing','SDLC & STLC','JIRA','Postman','REST API Testing','SQL','Selenium with Java','Playwright with JavaScript','TestNG'],
 array['Test case design techniques','Defect reporting & tracking','API testing with Postman','UI automation','Framework building','Agile QA practices'],
 'Live online classes','Test a real-world application end to end: manual test suite, API collection and an automation framework.','ShieldCheck',3),
('ai-llm-agent-development','AI, LLM and AI Agent Development','Build intelligent applications with LLMs, RAG and autonomous AI agents.',
 'Go from AI fundamentals to shipping LLM-powered products — prompt engineering, retrieval-augmented generation, tool-using agents and integrating AI into real applications.',
 array['Python','OpenAI API','LLMs','Prompt Engineering','RAG','Vector Databases','AI Agents','LangChain','FastAPI'],
 array['Prompt engineering','Building RAG pipelines','Designing AI agents & tool use','LLM API integration','Evaluating AI outputs'],
 'Live online classes','Build an AI agent that answers questions over your own documents and performs real tasks.','Sparkles',4),
('devops-cloud-computing','DevOps and Cloud Computing','Automate, containerise and deploy software on the cloud.',
 'Learn the DevOps toolchain used by modern engineering teams — Linux, version control, CI/CD, containers, orchestration and cloud infrastructure.',
 array['Linux','Git','GitHub Actions','Docker','Kubernetes','AWS','Terraform','Monitoring'],
 array['CI/CD pipeline setup','Containerisation','Cloud infrastructure basics','Infrastructure as code','Deployment & monitoring'],
 'Live online classes','Set up a complete CI/CD pipeline that builds, containerises and deploys an application to the cloud.','Cloud',5),
('spoken-english-communication','Spoken English and Professional Communication','Speak confidently in interviews, meetings and the workplace.',
 'Improve fluency, pronunciation and professional communication so you can present your skills confidently in interviews and at work.',
 array['Spoken English','Pronunciation','Business Communication','Presentation Skills','Interview Communication','Email Writing'],
 array['Fluent everyday conversation','Professional email writing','Confident presentations','Interview communication','Workplace etiquette'],
 'Live online classes','Weekly speaking sessions, mock interviews and a final presentation to a panel.','MessagesSquare',6);

insert into public.services (slug, title, description, features, icon, sort_order) values
('website-development','Website Development','Fast, modern and SEO-friendly websites that represent your brand.', array['Business websites','Portfolio websites','Landing pages','Corporate websites'],'Globe',1),
('web-application-development','Web Application Development','Custom, scalable web applications built around your business.', array['Custom web applications','SaaS platforms','Admin dashboards','CRM and ERP applications'],'LayoutDashboard',2),
('mobile-application-development','Mobile Application Development','Native-quality mobile apps for Android and iOS.', array['Android applications','iOS applications','Cross-platform applications'],'Smartphone',3),
('ai-agent-development','AI Agent Development','Intelligent agents that automate work and assist your team.', array['Custom AI agents','AI-powered business assistants','Workflow automation','Intelligent task automation'],'Bot',4),
('ai-llm-solutions','AI and LLM Solutions','Practical AI features powered by large language models.', array['AI chatbot development','OpenAI API integration','LLM-based applications','RAG-based applications'],'Sparkles',5),
('ecommerce-development','E-commerce Development','Online stores and marketplaces built to sell.', array['Online shopping platforms','Payment gateway integration','Seller and buyer dashboards','Order management systems'],'ShoppingCart',6),
('software-testing-qa','Software Testing and QA','Ship with confidence through rigorous quality assurance.', array['Manual testing','API testing','Selenium automation','Playwright automation','Automation framework development'],'ShieldCheck',7);

insert into public.trainers (full_name, designation, expertise, sort_order) values
('Dharmendra Pandey','Founder & CEO | SDET | Software Testing Trainer', array['Manual Testing','API Testing','Selenium with Java','Playwright with JavaScript','Automation Frameworks','AI-assisted Testing'],1),
('Rodiyana','Advanced Communication Trainer', array['Spoken English','Professional Communication','Advanced Communication Skills'],2);

insert into public.referral_companies (name, sort_order) values
('TCS',1),('Infosys',2),('Wipro',3),('Accenture',4),('Cognizant',5),('Capgemini',6),('HCLTech',7),('IBM',8),('Deloitte',9),('Amazon',10),('Microsoft',11),('Tech Mahindra',12);

insert into public.testimonials (kind, name, role_or_company, feedback, is_sample, sort_order) values
('student','Sample Student','Sample placeholder — replace with real feedback','This is a sample testimonial placeholder. Real student feedback will appear here once it is collected and approved.', true, 1),
('student','Sample Learner','Sample placeholder — replace with real feedback','This is a sample testimonial placeholder. Add genuine student stories from the admin dashboard.', true, 2),
('client','Sample Client','Sample placeholder — replace with real feedback','This is a sample client testimonial placeholder. Real client reviews will appear here once available.', true, 3);
