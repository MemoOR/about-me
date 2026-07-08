import { useTranslation } from 'react-i18next';
import { Icon, type IconName } from '../components/Icon';

interface WorkMediaIcon {
  type: 'icon';
  icon: IconName;
}
interface WorkMediaImg {
  type: 'img';
  src: string;
  alt: string;
  extra?: string;
}

interface Work {
  filter: string;
  link?: { href: string; cls: 'work-modal-link' | 'work-ext-link'; target?: boolean };
  media: WorkMediaIcon | WorkMediaImg;
  title: string;
  descr: string;
  click?: string;
}

export default function Portfolio() {
  const { t } = useTranslation();

  const viewArch = t('portfolio.viewArch', 'Click to view architecture overview');
  const visitSite = t('portfolio.visitSite', 'Click to visit the site');
  const learnMore = t('portfolio.learnMore', 'Click to learn more');

  const works: Work[] = [
    {
      filter: 'thomsonreuters',
      link: { href: '#image-factory-modal', cls: 'work-modal-link' },
      media: { type: 'icon', icon: 'trLogo' },
      title: t('portfolio.imageFactoryTitle', 'Self-Service Image Factory'),
      descr: t('portfolio.imageFactoryDescr', 'Architected a serverless, multicloud self-service platform for building, testing, scanning, and distributing 100+ golden machine images across AWS, Azure, GCP, and OCI. Reduced release cycles from monthly to weekly and cut infrastructure costs by 40%.'),
      click: viewArch,
    },
    {
      filter: 'thomsonreuters',
      link: { href: '#ai-agent-modal', cls: 'work-modal-link' },
      media: { type: 'img', src: '/static/assets/img/ai_agent.webp', alt: 'Image Factory AI Agent' },
      title: t('portfolio.aiAgentTitle', 'Image Factory AI Agent'),
      descr: t('portfolio.aiAgentDescr', 'Built an AI agent powered by AWS Bedrock AgentCore with multimodal capabilities — processing files and media via Gemini for RAG stored in S3, then generating responses with Claude. Features custom tools, log access, database queries, automated troubleshooting, and disaster recovery monitoring with fully auditable, traceable actions.'),
      click: viewArch,
    },
    {
      filter: 'thomsonreuters',
      link: { href: '#dns-manager-modal', cls: 'work-modal-link' },
      media: { type: 'img', src: '/static/assets/img/dns.webp', alt: 'DNS Management Platform' },
      title: t('portfolio.dnsTitle', 'DNS Management Platform'),
      descr: t('portfolio.dnsDescr', 'Designed the architecture for an enterprise DNS management application handling 200+ domains and 30,000+ records with audit trail, ownership integration, and failover planning. Built serverless on Azure with 100% IaC via Bicep.'),
      click: viewArch,
    },
    {
      filter: 'gdcode',
      link: { href: 'https://colegiomalinalli.com.mx/', cls: 'work-ext-link', target: true },
      media: { type: 'img', src: '/static/assets/img/malinalli_logo.webp', alt: 'Colegio Malinalli Website', extra: 'work-img-contain' },
      title: t('portfolio.malinalliTitle', 'Colegio Malinalli'),
      descr: t('portfolio.malinalliDescr', 'Designed and developed a responsive institutional website for Colegio Malinalli, delivering a modern web presence to enhance enrollment and community engagement.'),
      click: visitSite,
    },
    {
      filter: 'gdcode',
      media: { type: 'img', src: '/static/assets/img/cryptobot_logo.webp', alt: 'Crypto Trading Bot Pooling Platform' },
      title: t('portfolio.cryptoTitle', 'Crypto Trading Platform'),
      descr: t('portfolio.cryptoDescr', "Built a collaborative crypto trading platform featuring a pooling system where multiple investors contribute capital managed by an automated trading bot. The system handles proportional profit distribution based on each user's stake. Access restricted via private VPN."),
    },
    {
      filter: 'gdcode',
      link: { href: 'https://github.com/gd-code-md/SmartTerrariumR', cls: 'work-ext-link', target: true },
      media: { type: 'img', src: '/static/assets/img/terrario.webp', alt: 'Smart Terra IoT Terrarium' },
      title: t('portfolio.smartTerraTitle', 'Smart Terra'),
      descr: t('portfolio.smartTerraDescr', 'Co-developed a full-stack IoT application for automated terrarium climate control, integrating real-time sensor data with a responsive dashboard for remote monitoring.'),
      click: learnMore,
    },
    {
      filter: 'design espressive',
      media: { type: 'img', src: '/static/assets/img/1password_logo.webp', alt: 'Espressive 1Password Secrets Library' },
      title: t('portfolio.onePasswordTitle', '1Password Secrets Library'),
      descr: t('portfolio.onePasswordDescr', 'Built an internal Python library for secure secrets management via the 1Password API, enabling automated credential retrieval across CI/CD pipelines and reducing manual secret handling across the engineering organization.'),
    },
    {
      filter: 'design espressive',
      media: { type: 'img', src: '/static/assets/img/redshift.webp', alt: 'Espressive Data Warehouse Infrastructure' },
      title: t('portfolio.dataWarehouseTitle', 'Data Warehouse'),
      descr: t('portfolio.dataWarehouseDescr', 'Architected and automated the provisioning of an AWS Redshift data warehouse using Terraform and Python, implementing Infrastructure as Code best practices with full compliance to enterprise security policies.'),
    },
    {
      filter: 'design espressive',
      media: { type: 'img', src: '/static/assets/img/barista_logo.svg', alt: 'Espressive MLOps Blue-Green Deployment' },
      title: t('portfolio.mlopsTitle', 'MLOps Pipeline'),
      descr: t('portfolio.mlopsDescr', 'Engineered a Blue-Green deployment pipeline for AWS SageMaker ML endpoints, achieving zero-downtime model updates and eliminating the previous 30-minute service interruption during production releases.'),
    },
    {
      filter: 'gdcode',
      link: { href: 'https://www.gdcode.com.mx/', cls: 'work-ext-link', target: true },
      media: { type: 'img', src: '/static/assets/img/gdcode_logo.webp', alt: 'GD-code Labs & Studios' },
      title: t('portfolio.gdcodeSiteTitle', 'GD-code Website'),
      descr: t('portfolio.gdcodeSiteDescr', 'GD-code Labs & Studios is a custom software and hardware studio based in Mexico City. As co-founder, I help design and build full-stack solutions end to end — from web and mobile apps to cloud infrastructure and custom electronics.'),
      click: visitSite,
    },
    {
      filter: 'branding personal',
      link: {
        href: 'https://www.linkedin.com/posts/guillermo-or_dji-python-algoritmos-activity-6906065588762808320-vTRs?utm_source=share&utm_medium=member_desktop',
        cls: 'work-ext-link',
        target: true,
      },
      media: { type: 'img', src: '/static/assets/img/robomaster.webp', alt: 'DJI Robomaster Autonomous Navigation' },
      title: t('portfolio.robomasterTitle', 'Robomaster Autonomous Navigation'),
      descr: t('portfolio.robomasterDescr', 'Developed path-planning and trajectory generation algorithms in Python for the DJI Robomaster, enabling autonomous navigation through complex obstacle courses.'),
      click: learnMore,
    },
    {
      filter: 'branding personal',
      link: { href: 'https://github.com/MemoOR/SmartWifiBlinds', cls: 'work-ext-link', target: true },
      media: { type: 'img', src: '/static/assets/img/blinds_model.webp', alt: 'IoT Smart Blinds with Alexa' },
      title: t('portfolio.smartBlindsTitle', 'Smart Blinds'),
      descr: t('portfolio.smartBlindsDescr', 'Designed and built a custom IoT home automation device with WiFi connectivity and Alexa voice integration, enabling remote and voice-controlled operation of window blinds.'),
      click: learnMore,
    },
    {
      filter: 'design personal',
      media: { type: 'img', src: '/static/assets/img/crawler.webp', alt: 'Assistive Crawling Device for Children' },
      title: t('portfolio.crawlerTitle', 'Assistive Crawling Device'),
      descr: t('portfolio.crawlerDescr', 'Co-designed and fabricated an assistive mobility device for children with developmental disabilities, combining mechatronic engineering with accessibility-focused design to support early motor skill development.'),
    },
  ];

  const renderMedia = (media: Work['media']) => {
    if (media.type === 'icon') {
      return (
        <div className="work-img-logo lazy-p wow-p animate__animated animate__fadeIn" data-wow-delay="1s">
          <Icon name={media.icon} />
        </div>
      );
    }
    const cls = `lazy-p wow-p animate__animated animate__fadeIn${media.extra ? ` ${media.extra}` : ''}`;
    return (
      <img data-src={media.src} alt={media.alt} className={cls} data-wow-delay="1s" style={{ margin: '0 auto' }} loading="lazy" />
    );
  };

  return (
    <section className="page-section pb-0 bg-dark light-contents" id="portfolio">
      <div className="full-wrapper relative">
        <div className="text-center mb-80 mb-sm-50">
          <h2 className="section-title">{t('portfolio.title', 'Portfolio')}</h2>
          <p className="section-title-descr">{t('portfolio.subtitle', 'Take a look at some projects i have worked on')}</p>
        </div>

        {/* Works Filter */}
        <div className="works-filter text-center">
          <a href="#" className="filter active" role="button" aria-pressed="true" data-filter="*">
            {t('portfolio.filterAll', 'All projects')}
          </a>
          <a href="#personal" className="filter" role="button" aria-pressed="false" data-filter=".personal">
            {t('portfolio.filterPersonal', 'Personal')}
          </a>
          <a href="#gdcode" className="filter" role="button" aria-pressed="false" data-filter=".gdcode">
            GDcode
          </a>
          <a href="#espressive" className="filter" role="button" aria-pressed="false" data-filter=".espressive">
            {t('portfolio.filterEspressive', 'Espressive')}
          </a>
          <a href="#thomsonreuters" className="filter" role="button" aria-pressed="false" data-filter=".thomsonreuters">
            {t('portfolio.filterTr', 'Thomson Reuters')}
          </a>
        </div>

        {/* Works Grid */}
        <ul className="works-grid work-grid-3 clearfix hide-titles" id="work-grid">
          {works.map((work, index) => {
            const inner = (
              <>
                <div className="work-img text-center">
                  <div className="work-img-bg wow-p animate__animated animate__scalexIn" />
                  {renderMedia(work.media)}
                </div>
                <div className={work.link ? 'work-intro' : 'work-intro no-link text-center'}>
                  <h3 className="work-title">{work.title}</h3>
                  <div className="work-descr">
                    <br />
                    {work.descr}
                    {work.click && (
                      <>
                        <br />
                        <br />
                        {work.click}
                      </>
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <li className={`work-item mix ${work.filter}`} key={index}>
                {work.link ? (
                  <a
                    href={work.link.href}
                    className={work.link.cls}
                    {...(work.link.target ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Image Factory Architecture Modal */}
      <div id="image-factory-modal" className="image-factory-modal mfp-hide">
        <h3 className="ifm-title">{t('portfolio.imageFactoryTitle', 'Self-Service Image Factory')}</h3>
        <p className="ifm-subtitle">{t('portfolio.imageFactorySubtitle', 'Serverless Multicloud Golden Image Platform — Thomson Reuters')}</p>

        <div className="ifm-access-layer">
          <span className="ifm-access-label">
            <i className="fa-solid fa-shield-halved" /> {t('portfolio.corporateVpn', 'CORPORATE VPN + SSO')}
          </span>

          <div className="ifm-interfaces">
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-desktop" /></div>
              <div className="ifm-interface-name">{t('portfolio.webUi', 'Web UI')}</div>
              <div className="ifm-interface-tech">React + Vite</div>
              <div className="ifm-interface-infra">S3 / EC2 / ELB</div>
            </div>
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-terminal" /></div>
              <div className="ifm-interface-name">CLI</div>
              <div className="ifm-interface-tech">Linux / Windows / Mac</div>
              <div className="ifm-interface-infra">{t('portfolio.crossPlatform', 'Cross-platform')}</div>
            </div>
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-bolt" /></div>
              <div className="ifm-interface-name">API</div>
              <div className="ifm-interface-tech">FastAPI + Lambda</div>
              <div className="ifm-interface-infra">{t('portfolio.serverless', 'Serverless')}</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-orchestrator">
            <div className="ifm-orchestrator-title"><i className="fa-solid fa-industry" /> {t('portfolio.factoryOrchestrator', 'Factory Orchestrator')}</div>
            <div className="ifm-orchestrator-desc">{t('portfolio.orchestratorDesc', 'Manages the full image lifecycle via simple YML definitions')}</div>
          </div>

          <div className="ifm-pipeline">
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-hammer" /></div>
              <div className="ifm-step-label">Build</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-flask-vial" /></div>
              <div className="ifm-step-label">Test</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-magnifying-glass" /></div>
              <div className="ifm-step-label">Scan</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-share-nodes" /></div>
              <div className="ifm-step-label">Share</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-recycle" /></div>
              <div className="ifm-step-label">Lifecycle</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-clouds">
            <span className="ifm-cloud ifm-cloud-aws">AWS</span>
            <span className="ifm-cloud ifm-cloud-govcloud">GovCloud</span>
            <span className="ifm-cloud ifm-cloud-fedramp">FedRAMP</span>
            <span className="ifm-cloud ifm-cloud-azure">Azure</span>
            <span className="ifm-cloud ifm-cloud-gcp">GCP</span>
            <span className="ifm-cloud ifm-cloud-oci">OCI</span>
          </div>
        </div>

        <div className="ifm-metrics">
          <div className="ifm-metric">
            <div className="ifm-metric-value">100+</div>
            <div className="ifm-metric-label">{t('portfolio.goldenImages', 'Golden Images')}</div>
          </div>
          <div className="ifm-metric">
            <div className="ifm-metric-value">40%</div>
            <div className="ifm-metric-label">{t('portfolio.costReduction', 'Cost Reduction')}</div>
          </div>
          <div className="ifm-metric">
            <div className="ifm-metric-value">4x</div>
            <div className="ifm-metric-label">{t('portfolio.fasterReleases', 'Faster Releases')}</div>
          </div>
        </div>

        <div className="ifm-techstack">
          Terraform &middot; Python &middot; Bash &middot; FastAPI &middot; React &middot; Vite &middot; AWS Lambda &middot; S3 &middot; CI/CD
        </div>
      </div>

      {/* DNS Manager Architecture Modal */}
      <div id="dns-manager-modal" className="image-factory-modal mfp-hide">
        <h3 className="ifm-title">{t('portfolio.dnsTitle', 'DNS Management Platform')}</h3>
        <p className="ifm-subtitle">{t('portfolio.dnsSubtitle', 'Enterprise DNS Record Management — Thomson Reuters')}</p>

        <div className="ifm-access-layer">
          <span className="ifm-access-label">
            <i className="fa-solid fa-shield-halved" /> {t('portfolio.corporateVpn', 'CORPORATE VPN + SSO')}
          </span>

          <div className="ifm-interfaces">
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-desktop" /></div>
              <div className="ifm-interface-name">{t('portfolio.webUi', 'Web UI')}</div>
              <div className="ifm-interface-tech">React</div>
              <div className="ifm-interface-infra">Azure Web App</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-orchestrator">
            <div className="ifm-orchestrator-title"><i className="fa-solid fa-network-wired" /> {t('portfolio.appGateway', 'Application Gateway')}</div>
            <div className="ifm-orchestrator-desc">{t('portfolio.appGatewayDesc', 'Load balancing, WAF, and SSL termination')}</div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-interfaces">
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-bolt" /></div>
              <div className="ifm-interface-name">{t('portfolio.backendApi', 'Backend API')}</div>
              <div className="ifm-interface-tech">Python</div>
              <div className="ifm-interface-infra">Azure Function App</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-interfaces">
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-database" /></div>
              <div className="ifm-interface-name">{t('portfolio.database', 'Database')}</div>
              <div className="ifm-interface-tech">MongoDB API</div>
              <div className="ifm-interface-infra">Azure Cosmos DB</div>
            </div>
          </div>
        </div>

        <div className="ifm-pipeline">
          <div className="ifm-pipeline-step">
            <div className="ifm-step-icon"><i className="fa-solid fa-clipboard-list" /></div>
            <div className="ifm-step-label">{t('portfolio.auditTrail', 'Audit Trail')}</div>
          </div>
          <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
          <div className="ifm-pipeline-step">
            <div className="ifm-step-icon"><i className="fa-solid fa-users-gear" /></div>
            <div className="ifm-step-label">{t('portfolio.ownership', 'Ownership')}</div>
          </div>
          <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
          <div className="ifm-pipeline-step">
            <div className="ifm-step-icon"><i className="fa-solid fa-rotate" /></div>
            <div className="ifm-step-label">{t('portfolio.failover', 'Failover')}</div>
          </div>
          <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
          <div className="ifm-pipeline-step">
            <div className="ifm-step-icon"><i className="fa-solid fa-ticket" /></div>
            <div className="ifm-step-label">ServiceNow</div>
          </div>
        </div>

        <div className="ifm-metrics">
          <div className="ifm-metric">
            <div className="ifm-metric-value">200+</div>
            <div className="ifm-metric-label">{t('portfolio.domains', 'Domains')}</div>
          </div>
          <div className="ifm-metric">
            <div className="ifm-metric-value">30K+</div>
            <div className="ifm-metric-label">{t('portfolio.dnsRecords', 'DNS Records')}</div>
          </div>
          <div className="ifm-metric">
            <div className="ifm-metric-value">100%</div>
            <div className="ifm-metric-label">{t('portfolio.iacBicep', 'IaC with Bicep')}</div>
          </div>
        </div>

        <div className="ifm-techstack">
          React &middot; Python &middot; Azure Function App &middot; Cosmos DB &middot; Application Gateway &middot; Bicep
        </div>
      </div>

      {/* AI Agent Architecture Modal */}
      <div id="ai-agent-modal" className="image-factory-modal mfp-hide">
        <h3 className="ifm-title">{t('portfolio.aiAgentTitle', 'Image Factory AI Agent')}</h3>
        <p className="ifm-subtitle">{t('portfolio.aiAgentSubtitle', 'Intelligent Operations Assistant — Thomson Reuters')}</p>

        <div className="ifm-access-layer">
          <span className="ifm-access-label">
            <i className="fa-solid fa-shield-halved" /> {t('portfolio.corporateVpn', 'CORPORATE VPN + SSO')}
          </span>

          <div className="ifm-interfaces">
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-comments" /></div>
              <div className="ifm-interface-name">{t('portfolio.chatUi', 'Chat UI')}</div>
              <div className="ifm-interface-tech">{t('portfolio.webUiIntegration', 'Web UI Integration')}</div>
              <div className="ifm-interface-infra">{t('portfolio.imageFactoryWebApp', 'Image Factory Web App')}</div>
            </div>
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-robot" /></div>
              <div className="ifm-interface-name">{t('portfolio.automation', 'Automation')}</div>
              <div className="ifm-interface-tech">{t('portfolio.monitorDr', 'Monitor & DR')}</div>
              <div className="ifm-interface-infra">{t('portfolio.scheduledEvent', 'Scheduled & Event-driven')}</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-pipeline">
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-file-image" /></div>
              <div className="ifm-step-label">{t('portfolio.mediaFiles', 'Media/Files')}</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-eye" /></div>
              <div className="ifm-step-label">Gemini</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-brands fa-aws" /></div>
              <div className="ifm-step-label">{t('portfolio.ragS3', 'RAG → S3')}</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-arrow-right" /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-brain" /></div>
              <div className="ifm-step-label">Claude</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-orchestrator">
            <div className="ifm-orchestrator-title"><i className="fa-solid fa-brain" /> {t('portfolio.bedrockAgentCore', 'AWS Bedrock AgentCore')}</div>
            <div className="ifm-orchestrator-desc">{t('portfolio.agentDesc', 'Refined system prompt, custom skills & tools for Image Factory operations')}</div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-pipeline">
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-magnifying-glass" /></div>
              <div className="ifm-step-label">{t('portfolio.logAccess', 'Log Access')}</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-database" /></div>
              <div className="ifm-step-label">{t('portfolio.dbQueries', 'DB Queries')}</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-gear" /></div>
              <div className="ifm-step-label">{t('portfolio.apiActions', 'API Actions')}</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-wrench" /></div>
              <div className="ifm-step-label">{t('portfolio.troubleshoot', 'Troubleshoot')}</div>
            </div>
            <div className="ifm-pipeline-arrow"><i className="fa-solid fa-circle" style={{ fontSize: '6px', verticalAlign: 'middle' }} /></div>
            <div className="ifm-pipeline-step">
              <div className="ifm-step-icon"><i className="fa-solid fa-shield-halved" /></div>
              <div className="ifm-step-label">{t('portfolio.disasterRecovery', 'Disaster Recovery')}</div>
            </div>
          </div>

          <div className="ifm-arrow"><i className="fa-solid fa-arrow-down" /></div>

          <div className="ifm-interfaces">
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-clipboard-check" /></div>
              <div className="ifm-interface-name">{t('portfolio.auditTrail', 'Audit Trail')}</div>
              <div className="ifm-interface-tech">{t('portfolio.allActionsLogged', 'All actions logged')}</div>
              <div className="ifm-interface-infra">{t('portfolio.traceableQueryable', 'Traceable & Queryable')}</div>
            </div>
            <div className="ifm-interface-card">
              <div className="ifm-icon"><i className="fa-solid fa-industry" /></div>
              <div className="ifm-interface-name">{t('portfolio.imageFactoryApi', 'Image Factory API')}</div>
              <div className="ifm-interface-tech">{t('portfolio.fullApiCapabilities', 'Full API capabilities')}</div>
              <div className="ifm-interface-infra">FastAPI + Lambda</div>
            </div>
          </div>
        </div>

        <div className="ifm-metrics">
          <div className="ifm-metric">
            <div className="ifm-metric-value"><i className="fa-solid fa-robot" /></div>
            <div className="ifm-metric-label">{t('portfolio.autonomousOps', 'Autonomous Ops')}</div>
          </div>
          <div className="ifm-metric">
            <div className="ifm-metric-value"><i className="fa-solid fa-clock-rotate-left" /></div>
            <div className="ifm-metric-label">{t('portfolio.engineeringCyclesFreed', 'Engineering Cycles Freed')}</div>
          </div>
          <div className="ifm-metric">
            <div className="ifm-metric-value">100%</div>
            <div className="ifm-metric-label">{t('portfolio.auditableActions', 'Auditable Actions')}</div>
          </div>
        </div>

        <div className="ifm-techstack">
          AWS Bedrock AgentCore &middot; Claude &middot; Gemini &middot; Python &middot; FastAPI &middot; React &middot; Lambda &middot; S3 &middot; DynamoDB
        </div>
      </div>
    </section>
  );
}
