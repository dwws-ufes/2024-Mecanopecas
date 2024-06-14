import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ContentWrapper, MainContent } from './styles.ts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <ContentWrapper>
    <Header />
    <MainContent>
      {children}
    </MainContent>
    <Footer />
  </ContentWrapper>
);

export default Layout;
