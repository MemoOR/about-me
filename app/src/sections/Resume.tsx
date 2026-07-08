import { useTranslation } from 'react-i18next';
import { Icon, RawSvg, carouselIcons } from '../components/Icon';
import Divider from '../components/Divider';
import { pdfUrls, certificateUrls, type Lang } from '../lib/site';

export default function Resume({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const pdf = pdfUrls(lang);

  return (
    <>
      <section className="page-section bg-dark light-content" id="resume">
        <div className="container relative">
          <div
            className="text-center mb-80 mb-sm-50 wow animate__animated animate__fadeInUpShort"
            data-wow-delay="0"
            data-wow-duration="1s"
          >
            <h2 className="section-title">{t('resume.title', 'Resume')}</h2>
            <p className="section-title-descr">{t('resume.subtitle', 'Education and professional experience')}</p>
          </div>

          {/* Resume Grid */}
          <div className="row resume-grid">
            {/* Education column */}
            <div className="col-sm-6 col-md-6 col-lg-6 mt-5">
              <div className="d-flex align-items-center justify-content-center">
                <h3 className="mb-5">
                  <u>{t('resume.education', 'Education')}</u>
                </h3>
              </div>

              {/* DevOps */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon icon-rect icon-light">
                  <Icon name="udemyLogo" />
                </div>
                <h3 className="resume-title">{t('resume.edu1Title', 'DevOps Beginners to Advanced with Projects')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;2023
                </span>
                <div className="resume-descr">
                  {t('resume.udemyCertification', 'Udemy Certification')}
                  <br />
                  {t('resume.edu1Descr', 'Completed a DevOps course with a focus on AWS and Kubernetes, significantly improving my skills and deepening my understanding of industry best practices.')}
                </div>
                <div className="resume-more">
                  <a href={certificateUrls.udemyDevops} className="text-link lightbox-gallery-1 mfp-image">
                    {t('resume.certificate', 'Certificate')}
                  </a>
                </div>
              </div>

              {/* Three.JS */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon icon-rect icon-light">
                  <Icon name="udemyLogo" />
                </div>
                <h3 className="resume-title">{t('resume.edu2Title', 'The Beginners Guide to 3D Web Game Development with Three.JS')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;2023
                </span>
                <div className="resume-descr">
                  {t('resume.udemyCertification', 'Udemy Certification')}
                  <br />
                  {t('resume.edu2Descr', 'Learned how to write JavaScript code to create 3D games using the WebGL library, Three JS.')}
                </div>
                <div className="resume-more">
                  <a href={certificateUrls.udemyThreejs} className="text-link lightbox-gallery-1 mfp-image">
                    {t('resume.certificate', 'Certificate')}
                  </a>
                </div>
              </div>

              {/* IELTS */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon icon-rect icon-light">
                  <Icon name="ieltsLogo" />
                </div>
                <h3 className="resume-title">{t('resume.edu3Title', 'IELTS English Certification - C1')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;2022
                </span>
                <div className="resume-descr">{t('resume.edu3Descr', 'English level: Full professional proficiency')}</div>
                <div className="resume-more">
                  <a href={pdf.ieltsCertificateUrl} className="text-link lightbox-gallery-1 mfp-iframe">
                    {t('resume.certificate', 'Certificate')}
                  </a>
                </div>
              </div>

              {/* Ibero */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon icon-rect">
                  <Icon name="iberoLogo" />
                </div>
                <h3 className="resume-title">{t('resume.edu4Title', 'Mechatronics Engineering')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;{t('resume.edu4Date', 'Aug/2017 - Dec/2022')}
                </span>
                <div className="resume-descr">
                  {t('resume.bachelorsDegree', "Bachelor's Degree")}
                  <br />
                  Universidad Iberoamericana
                </div>
                <div className="resume-more">
                  <a href="https://ibero.mx/" className="text-link" target="_blank" rel="noopener noreferrer">
                    {t('resume.iberoWebpage', 'Ibero Webpage')}
                  </a>
                </div>
              </div>
            </div>

            {/* Experience column */}
            <div className="col-sm-6 col-md-6 col-lg-6 mt-5">
              <div className="d-flex align-items-center justify-content-center">
                <h3 className="mb-5">
                  <u>{t('resume.experience', 'Experience')}</u>
                </h3>
              </div>

              {/* Thomson Reuters */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex w-100 align-items-center resume-icon icon-rect icon-light">
                  <Icon name="trLogo" />
                </div>
                <h3 className="resume-title">{t('resume.exp1Title', 'Senior Cloud Engineer')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;{t('resume.exp1Date', 'Apr/2024 - Present')}
                </span>
                <div className="resume-descr">
                  Thomson Reuters
                  <br />
                  {t('resume.exp1Descr', 'Architected a serverless multicloud Image Factory delivering 100+ golden machine images across AWS, Azure, GCP, and OCI, cutting release cycles from monthly to weekly. Designed an enterprise DNS management platform handling 200+ domains and 30,000+ records on Azure. Reduced infrastructure costs by 40% through automation with Terraform, Bicep, CloudFormation, and Python.')}
                </div>
                <div className="resume-more">
                  <a href="https://www.thomsonreuters.com/" className="text-link" target="_blank" rel="noopener noreferrer">
                    {t('resume.trWebpage', 'Thomson Reuters Webpage')}
                  </a>
                </div>
              </div>

              {/* Espressive */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon icon-rect">
                  <Icon name="espressiveLogo" />
                </div>
                <h3 className="resume-title">{t('resume.exp2Title', 'DevOps Engineer')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;{t('resume.exp2Date', 'Sep/2022 - Apr/2024')}
                </span>
                <div className="resume-descr">
                  Espressive Inc.
                  <br />
                  {t('resume.exp2Descr', 'Engineered a zero-downtime Blue-Green deployment pipeline for AWS SageMaker ML endpoints, eliminating 30-minute service interruptions. Provisioned an AWS Redshift data warehouse with Terraform and Python following IaC best practices. Built a 1Password secrets management library adopted across CI/CD pipelines, reducing manual credential handling organization-wide.')}
                </div>
                <div className="resume-more">
                  <a href="https://www.espressive.com/" className="text-link" target="_blank" rel="noopener noreferrer">
                    {t('resume.espressiveWebpage', 'Espressive Webpage')}
                  </a>
                </div>
              </div>

              {/* INIAT */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center text-center resume-icon icon-rect icon-light">
                  <Icon name="iniatLogo" />
                </div>
                <h3 className="resume-title">{t('resume.exp3Title', 'Robotics & Controls Developer')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;{t('resume.exp3Date', 'Aug/2021 - Jan/2023')}
                </span>
                <div className="resume-descr">
                  INIAT
                  <br />
                  {t('resume.exp3Descr', 'Led the design and development of an autonomous two-wheeled vehicle using Python, ROS 2, and C++. Implemented AI-driven control and navigation algorithms, integrating sensor hardware with real-time software systems for autonomous operation.')}
                </div>
                <div className="resume-more">
                  <a href="https://iniat.ibero.mx/" className="text-link" target="_blank" rel="noopener noreferrer">
                    {t('resume.iniatWebpage', 'INIAT Webpage')}
                  </a>
                </div>
              </div>

              {/* GD-code */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon">
                  <img className="lazy" data-src="/static/assets/img/gdcode_logo.webp" alt="Resume logo" loading="lazy" />
                </div>
                <h3 className="resume-title">{t('resume.exp4Title', 'Full Stack Developer')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;{t('resume.exp4Date', 'May/2020 - Present')}
                </span>
                <div className="resume-descr">
                  GD-code - Freelance <br />
                  {t('resume.exp4Descr', 'Delivering end-to-end solutions for clients: responsive web applications with Flask and Django, serverless REST APIs on AWS Lambda, desktop tools in Python, and embedded IoT hardware. Full ownership from architecture to deployment across diverse platforms and technologies.')}
                </div>
                <div className="resume-more">
                  <a href="https://www.gdcode.com.mx/" className="text-link" target="_blank" rel="noopener noreferrer">
                    {t('resume.gdcodeWebpage', 'GD-code Webpage')}
                  </a>
                </div>
              </div>

              {/* Malinalli */}
              <div className="resume-item text-center wow animate__animated animate__fadeInUpShort" data-wow-delay=".1s" data-wow-duration="1.5s">
                <div className="pb-3 d-flex align-items-center resume-icon">
                  <img className="lazy" data-src="/static/assets/img/malinalli_logo.webp" alt="Resume logo" loading="lazy" />
                </div>
                <h3 className="resume-title">{t('resume.exp5Title', 'Computer Teacher')}</h3>
                <span className="date">
                  <i className="fa fa-calendar" />
                  <span className="sr-only" />
                  &nbsp;&nbsp;&nbsp;{t('resume.exp5Date', 'Jan/2018 - May/2018')}
                </span>
                <div className="resume-descr">
                  Malinalli <br />
                  {t('resume.exp5Descr', 'Supervised and taught nine groups across elementary and preschool levels, planning and delivering educational programs tailored to different age groups.')}
                </div>
                <div className="resume-more">
                  <a href="https://colegiomalinalli.com.mx/" className="text-link" target="_blank" rel="noopener noreferrer">
                    {t('resume.malinalliWebpage', 'Malinalli Webpage')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <div className="relative w-100" data-wow-delay=".1s" data-wow-duration="1.5s">
        <div className="wow animate__animated animate__fadeInUpShort">
          <div className="item-carousel owl-carousel">
            {carouselIcons.map((html, index) => (
              <div className="features-item" key={index}>
                <div className="features-icon">
                  <RawSvg html={html} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* Download pdf Section */}
      <section className="small-section light-content bg-dark-alfa-50 parallax-5" data-background="/static/assets/img/decorator.webp">
        <div className="container relative">
          <div className="row wow animate__animated animate__fadeInUpShort">
            <div className="col-lg-6">
              <h3 className="text-center call-action-1-heading">{t('resume.interested', 'Feeling interested?')}</h3>
              <div className="text-center call-action-1-decription mb-0 pb-md-20">{t('resume.viewDownloadCv', 'View or download my CV in PDF')}</div>
            </div>
            <div className="col-lg-2 pt-10 text-lg-end text-center">
              <div className="local-scroll">
                <a href={pdf.cvUrlPreview} className="btn btn-mod btn-w btn-medium btn-round mx-md-1 lightbox-gallery-1 mfp-iframe" download="File.pdf">
                  {t('resume.view', 'View')}
                </a>
              </div>
            </div>
            <div className="col-lg-2 pt-10 text-lg-end text-center">
              <div className="local-scroll">
                <a href={pdf.cvUrlDownload} className="btn btn-mod btn-w btn-medium btn-round mx-md-1 btn-round" download="File.pdf">
                  {t('resume.download', 'Download')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
