import { ConfigurationPage as Config } from '@cms/configuration-page';
import { Header, Container } from '@cms/ui';

export function ConfigurationPage() {
  return (
    <>
      <Header />
      <Container>
        <Config />
      </Container>
    </>
  );
}

export default ConfigurationPage;
