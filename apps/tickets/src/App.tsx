import { type SanityConfig } from "@sanity/sdk";
import { SanityApp } from "@sanity/sdk-react";
import { Flex, Spinner } from "@sanity/ui";
import { Events } from "./components/Events";
import { SanityUI } from "./SanityUI";

function App() {
  // apps can access many different projects or other sources of data
  const sanityConfigs: SanityConfig[] = [
    {
      projectId: "1l1r6zzx",
      dataset: "production",
    },
  ];

  function Loading() {
    return (
      <Flex justify="center" align="center" width="100vw" height="fill">
        <Spinner />
      </Flex>
    );
  }

  return (
    <SanityUI>
      <SanityApp config={sanityConfigs} fallback={<Loading />}>
        <Events />
      </SanityApp>
    </SanityUI>
  );
}

export default App;
