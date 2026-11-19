import IncursionExperience from '../components/IncursionExperience';
import { getEventSchema, getBreadcrumbSchema, SITE_URL } from '../lib/structured-data';

export default function Page() {
  const eventSchema = getEventSchema(SITE_URL);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IncursionExperience />
    </>
  );
}
