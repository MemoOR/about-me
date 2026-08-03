import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="page-section bg-dark light-content" id="about">
      <div className="container relative">
        <div className="mb-140 mb-sm-70">
          <div className="row section-text">
            <div className="col-md-12 col-lg-4 mb-md-50 mb-xs-30 d-flex justify-content-center align-items-center">
              <div className="lead-alt wow animate__linesAnimIn" data-splitting="lines" data-wow-delay="1.3s" data-wow-offset="0">
                {t('about.title', 'About Me')}
              </div>
            </div>

            <div
              style={{ textAlign: 'justify' }}
              className="col-md-6 col-lg-4 mb-sm-50 mb-xs-30 wow animate__linesAnimIn"
              data-splitting="lines"
              data-wow-delay="1.3s"
            >
              {t(
                'about.p1',
                'Senior Software Engineer II with a Mechatronics Engineering degree from Universidad Iberoamericana. I design and build serverless platforms, cloud infrastructure, and internal tooling across AWS, Azure, GCP, and OCI. Proficient in Python, Terraform, Bicep, and CloudFormation, I deliver scalable Infrastructure as Code solutions that reduce costs and accelerate release cycles.',
              )}
            </div>

            <div
              style={{ textAlign: 'justify' }}
              className="col-md-6 col-lg-4 mb-sm-50 mb-xs-30 wow animate__linesAnimIn"
              data-splitting="lines"
              data-wow-delay="1.3s"
            >
              {t(
                'about.p2',
                "My mechatronics background gives me a unique edge bridging hardware and software, from IoT embedded systems to full-stack web applications. I'm passionate about automation, DevOps best practices, and building tools that make engineering teams more productive. Outside of work, I enjoy playing the piano and woodworking, balancing creativity and precision in everything I do.",
              )}
            </div>
          </div>
        </div>

        <div className="row">
          {/* Team item */}
          <div className="col-md-4 mb-xs-30 mx-auto">
            <div className="team-item-wrap">
              <div>
                <div
                  className="team-item-decoration wow animate__animated animate__fadeInUp"
                  data-wow-offset="0"
                  data-background="/static/assets/img/decorator.webp"
                />
                <div className="team-item-decoration-overlay wow animate__animated animate__fadeInUp" data-wow-offset="0" />
              </div>

              <div className="team-item wow animate__animated animate__fadeInDown">
                <div className="team-item-image">
                  <img className="lazy" data-src="/static/assets/img/me.webp" alt="My photo" loading="lazy" />
                  <div className="team-item-detail">
                    <p className="team-item-detail-title">{t('about.whereToFind', 'Where to find me')}</p>
                    <p>{t('about.findText', 'Feel free to visit my LinkedIn and GitHub profiles to learn a little more about me')}</p>
                    <div className="team-social-links">
                      <a href="https://github.com/MemoOR" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" />
                        <span className="sr-only">{t('about.githubProfile', 'Github profile')}</span>
                      </a>
                      <a href="https://www.linkedin.com/in/guillermo-or" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin" />
                        <span className="sr-only">{t('about.linkedinProfile', 'LinkedIn profile')}</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-item-descr">
                  <div className="team-item-name">Guillermo Ortega Romo</div>
                  <div className="team-item-role">Senior Software Engineer II</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
