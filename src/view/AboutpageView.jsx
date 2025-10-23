import About from "../components/about/About";
import ErrorBoundary from "../components/base/ErrorBoundary";

const AboutpageView = () => {
  return (
    <>
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
    </>
  );
};

export default AboutpageView;
