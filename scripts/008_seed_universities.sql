-- Seed some sample universities
insert into public.universities (name, location, country, ranking, description, website_url, student_count, acceptance_rate, tuition_fee) values
  ('Massachusetts Institute of Technology', 'Cambridge, MA', 'United States', 1, 'MIT is a private research university known for its programs in engineering, computer science, and physical sciences.', 'https://www.mit.edu', 11934, 3.2, 59750),
  ('Stanford University', 'Stanford, CA', 'United States', 2, 'Stanford is a private research university known for its entrepreneurial spirit and proximity to Silicon Valley.', 'https://www.stanford.edu', 17249, 3.9, 58416),
  ('Harvard University', 'Cambridge, MA', 'United States', 3, 'Harvard is the oldest institution of higher education in the United States, known for its prestigious programs across all disciplines.', 'https://www.harvard.edu', 23731, 3.4, 57261),
  ('University of Oxford', 'Oxford', 'United Kingdom', 4, 'Oxford is the oldest university in the English-speaking world, known for its tutorial-based teaching method.', 'https://www.ox.ac.uk', 24515, 17.5, 11230),
  ('University of Cambridge', 'Cambridge', 'United Kingdom', 5, 'Cambridge is one of the world''s oldest and most prestigious universities, known for its collegiate system.', 'https://www.cam.ac.uk', 24450, 21.0, 11230),
  ('California Institute of Technology', 'Pasadena, CA', 'United States', 6, 'Caltech is a small but highly prestigious research university specializing in science and engineering.', 'https://www.caltech.edu', 2397, 3.9, 60864),
  ('ETH Zurich', 'Zurich', 'Switzerland', 7, 'ETH Zurich is a public research university known for its programs in science, technology, engineering, and mathematics.', 'https://ethz.ch', 24500, 8.0, 1500),
  ('Imperial College London', 'London', 'United Kingdom', 8, 'Imperial is a science-based institution with a reputation for excellence in teaching and research.', 'https://www.imperial.ac.uk', 20000, 14.3, 38000),
  ('University of Chicago', 'Chicago, IL', 'United States', 9, 'UChicago is known for its rigorous academic programs and influential research across many fields.', 'https://www.uchicago.edu', 18452, 5.4, 62940),
  ('University College London', 'London', 'United Kingdom', 10, 'UCL is London''s leading multidisciplinary university with a global reputation for research excellence.', 'https://www.ucl.ac.uk', 43800, 48.0, 28000),
  ('National University of Singapore', 'Singapore', 'Singapore', 11, 'NUS is Singapore''s flagship university offering a global approach to education and research.', 'https://www.nus.edu.sg', 40000, 5.0, 17550),
  ('Princeton University', 'Princeton, NJ', 'United States', 12, 'Princeton is known for its undergraduate focus and strong programs in humanities and sciences.', 'https://www.princeton.edu', 8842, 4.4, 57410),
  ('Yale University', 'New Haven, CT', 'United States', 13, 'Yale is known for its excellent drama and music programs, as well as its residential college system.', 'https://www.yale.edu', 14776, 4.6, 62250),
  ('University of Toronto', 'Toronto, ON', 'Canada', 14, 'U of T is Canada''s leading institution of learning, discovery and knowledge creation.', 'https://www.utoronto.ca', 95055, 43.0, 6100),
  ('University of Melbourne', 'Melbourne, VIC', 'Australia', 15, 'Melbourne is Australia''s leading university with a strong tradition of excellence in teaching and research.', 'https://www.unimelb.edu.au', 51000, 70.0, 30000)
on conflict do nothing;
