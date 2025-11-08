-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.acceptances (
  acceptance_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid,
  exam_id uuid,
  cut_score bigint NOT NULL,
  credits bigint,
  related_course character varying,
  updated_by bigint,
  last_updated date,
  School_name character varying,
  CONSTRAINT acceptances_pkey PRIMARY KEY (acceptance_id),
  CONSTRAINT acceptances_institution_id_fkey FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id),
  CONSTRAINT acceptances_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(exam_id)
);
CREATE TABLE public.contacts (
  contact_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id uuid DEFAULT auth.uid(),
  first_name character varying NOT NULL,
  last_name character varying,
  email character varying,
  phone character varying,
  title character varying,
  admin_type character varying NOT NULL,
  CONSTRAINT contacts_pkey PRIMARY KEY (contact_id),
  CONSTRAINT contacts_institution_id_fkey FOREIGN KEY (institution_id) REFERENCES public.institutions(institution_id)
);
CREATE TABLE public.exams (
  exam_id uuid NOT NULL DEFAULT gen_random_uuid(),
  exam_name character varying NOT NULL,
  CONSTRAINT exams_pkey PRIMARY KEY (exam_id)
);
CREATE TABLE public.institutions (
  institution_id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_name character varying NOT NULL,
  city character varying NOT NULL,
  state character varying NOT NULL,
  zip_code bigint NOT NULL,
  students_enrolled bigint,
  max_credits bigint,
  transcription_fee bigint,
  failed_course_allow boolean,
  enrolled_usage_allowed boolean,
  score_validity bigint,
  clep_url character varying,
  CONSTRAINT institutions_pkey PRIMARY KEY (institution_id)
);