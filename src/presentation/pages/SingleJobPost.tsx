import { Icon } from '@iconify/react'
import GradientColor from '../../application/data/GradientColor'
import JobPostCard from '../components/JobPostCard'
import { NavLink } from 'react-router-dom'

function SingleJobPost() {
    const {styles} = GradientColor()

  return (
    <div className='p-16 mt-8 ml-12'>
        <div className='flex my-10'>
            <div className='w-1/2 flex flex-col gap-5 items-start'>
                <img src="" alt="Company Image" className='w-20 h-10'/>
                <h1 className='font-semibold text-3xl'>Full Stack Developer</h1>
                <NavLink to='/single_organization/2' className='flex items-center gap-3 hover:text-primary-blue transition-colors duration-150'>
                    <Icon icon="mdi:company" width="16" height="16" />
                    <span>Google</span>
                </NavLink>
                <div className='flex items-center gap-3 '>
                    <Icon icon="carbon:location-company-filled" width="16" height="16" />
                    <span>USA</span>
                </div>
                <button className={`px-2 py-1 text-lg rounded-lg  ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>Apply</button>
            </div>
            <div className='py-8 px-5 border rounded-xl border-white w-1/2 h-96 scrollbar-none  overflow-scroll '>
            About Google
            <br />
            Google is the leading super App for on demand, ride-hailing, last-mile delivery, payment services and more, set to change the way daily services are provided. It currently operates in 45 cities across multiple countries. It has raised $150 million in Series B funding, five times what it raised in its previous priced round last November with world class investors such as BOND and Y Combinator, which is the precursor of the likes of Airbnb, Stripe, Dropbox, Doordash, among others.

            We’re not just about serving people - we’re about creating a marketplaceto bring people what they need while infusing social values.


            ABOUT THE ROLE
            <br />
            We are looking for a full stack developer at Google, with a thorough understanding of cloud technologies. You will help  build and manage data and model pipelines, ETL processes, and deploy machine learning models in a production, secure and scalable manner. The senior data engineer should be a data specialist with strong experience in the deployment and automation of data warehousing, data and model pipelines, data cleansing, monitoring data processing systems, and dealing with large and various sets of structured and unstructured data. You possess excellent communication skills along with the perseverance to solve problems that may not have obvious solutions. You may need to "Think out of the box" or "hack around" a problem to solve it. We like that!
            <br />
            TASKS
            <br />
            Design and build data and model pipelines in Google Cloud Platform, AWS or similar.
            Manage and automate ETL, ML model pipelines and cloud deployment implementations.
            Design and implement Data Warehousing solutions with their corresponding Data Governance processes.
            Design, implement, test CI/CD pipelines for the various data products to be productised.
            Design for data security and compliance.
            Manage, provision and orchestrate necessary cloud solution infrastructure.
            Be in charge of the MLOps lifecycle: research, design, experimentation, development, deployment, monitoring, and maintenance.
            Liaise with stakeholders to analyze business problems, clarify requirements and define the scope of the resolution needed.
            <br />
            REQUIREMENTS
            <br />
            5+ years experience using SQL and BigQuery or a SQL-based tool.
            Demonstrable deep knowledge and experience in cloud migration, cloud architecture, and data engineering.
            Production-level Python, SQL & NoSQL, CloudOps (GCP, AWS or Azure ecosystems), Git, CI/CD (Github Actions or CircleCI), MLflow.
            2+ years of hands-on experience with cloud orchestration tooling, infrastructure-as-a-code (Terraform, CloudFormation or similar).
            2+ years of hands-on experience building scalable ETL pipelines (Apache Beam, Airflow, Cloud Composer, Cloud Functions, Pub/Sub).
            Broad knowledge of one of the major cloud vendors.
            Strong problem-solving or analytics experience.
            Willingness to both teach others and learn new techniques.
            Advanced English communication skills.
            <br />
            About your experience
            <br />
            A set of certifications in GCP: Cloud Architect, Data Engineer, Cloud Engineer, ML Engineer (or similar in another cloud vendor).
            Hands-on experience in MLOps, ML model deployment, governance, and workflow optimization.
            Hands-on experience in one or various: LightGBM/XGBoost/Sklearn, Numpy/SciPy, Keras/PyTorch/Tabnet, Rust/C++, TensorFlow/Caffe/MXNet, CUDA/Ray, Node.js, REST/GraphQL, Neo4J, Grafana/Datadog, Kafka/Spark/Presto.
            Knowledge of/exposure to Google Analytics.
            Knowledge of/exposure to Adobe Marketing Cloud or Adobe Analytics.
            <br />
            BENEFITS
            <br />
            Great compensation and bonuses including stock options.
            Ground floor opportunity with the team; shape the strategic direction of the company.
            Sharp, motivated co-workers in a fun office environment.
            Full social coverage.
            <br />
            PERKS
            <br />
            Ground floor opportunity with the team; shape the strategic direction of the company.
            The rare opportunity to change the world around you such that everyone around you is using the product you built. We’re not just another app, we’re infusing social values and reinventing how services are provided.
            Sharp, motivated co-workers in a fun office environment.
            <br />
            Do you want to become part of our first-class team? You should definitely send us your application. 🚀
            </div>
        </div>
        <hr className='my-10'/>
        <div>
            <h1 className='font-semibold'>Similar Jobs</h1>
            <div className="flex my-10 gap-16 min-w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} >
                <JobPostCard cardStyle={'Small'}  jobData={{"logo":'https://w7.pngwing.com/pngs/606/802/png-transparent-meta-meta-logo-facebook-fb-logo-meta-icon-meta-symbol-facebook-logo-thumbnail.png', "company":'Meta', "skill":"Fluter", 'location':'medea', 'tag':"App development", date_posted:"2 days ago", tag_color:'green-700'}}/>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default SingleJobPost