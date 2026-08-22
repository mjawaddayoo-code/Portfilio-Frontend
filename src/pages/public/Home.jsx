import { useEffect, useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Skills from '../../components/public/Skills';
import Projects from '../../components/public/Projects';
import Experience from '../../components/public/Experience';
import Certificates from '../../components/public/Certificates';
import Education from '../../components/public/Education';
import Services from '../../components/public/Services';
import Contact from '../../components/public/Contact';
import api from '../../services/api';

const Home = () => {
  const [data, setData] = useState({
    skills: [],
    projects: [],
    experience: [],
    education: [],
    services: [],
    certificates: [],
  });
  const [loading, setLoading] = useState({
    skills: true,
    projects: true,
    experience: true,
    education: true,
    services: true,
    certificates: true,
  });

  useEffect(() => {
    const endpoints = [
      ['skills', '/skills'],
      ['projects', '/projects'],
      ['experience', '/experience'],
      ['education', '/education'],
      ['services', '/services'],
      ['certificates', '/certificates'],
    ];

    endpoints.forEach(([key, url]) => {
      api
        .get(url)
        .then(({ data: res }) => setData((d) => ({ ...d, [key]: res.data })))
        .catch(() => setData((d) => ({ ...d, [key]: [] })))
        .finally(() => setLoading((l) => ({ ...l, [key]: false })));
    });
  }, []);

  return (
    <PublicLayout>
      {(profile) => (
        <>
          <Hero profile={profile} />
          <About profile={profile} />
          <Skills skills={data.skills} loading={loading.skills} />
          <Projects projects={data.projects} loading={loading.projects} />
          <Experience experience={data.experience} loading={loading.experience} />
          <Certificates certificates={data.certificates} loading={loading.certificates} />
          <Education education={data.education} loading={loading.education} />
          <Services services={data.services} loading={loading.services} />
          <Contact profile={profile} />
        </>
      )}
    </PublicLayout>
  );
};

export default Home;
