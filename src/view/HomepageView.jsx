import Hero from "../components/homepage/Hero";
// import Reel from "../components/homepage/Reel";
import Gift from "../components/homepage/Gift";
import ErrorBoundary from "../components/base/ErrorBoundary";
import Band from "../components/homepage/Band";
import NewArrivals from "../components/homepage/NewArrivals";
const HomepageView = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* <ErrorBoundary>
        <Reel />
      </ErrorBoundary> */}
      <ErrorBoundary>
        <NewArrivals />
      </ErrorBoundary>

      <ErrorBoundary>
        <Gift />
      </ErrorBoundary>

      <ErrorBoundary>
        <Band />
      </ErrorBoundary>

      <ErrorBoundary>
        <NewArrivals />
      </ErrorBoundary>
    </>
  );
};

export default HomepageView;
