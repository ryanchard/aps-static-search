import { useRouter } from "next/router";

import { Container, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import STATIC from "../../../static.json";

import Result from "../../components/Result";
import { search } from "@globus/sdk";

export default function ResultPage() {
  const router = useRouter();

  const [entry, setEntry] = useState({
    tags: [],
    dates: [],
    contacts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      if (!router.query.subject) {
        return;
      }
      const response = await (
        await search.subject.get(STATIC.contents.globus.search.index, {
          query: {
            subject: Array.isArray(router.query.subject)
              ? router.query.subject[0]
              : router.query.subject,
          },
        })
      ).json();
      setIsLoading(false);
      setEntry(response.entries[0].content);
    }

    fetchResult();
  }, [router.query.subject]);

  return (
    <Container maxW="container.xl" p={4}>
      <Result entry={entry} isLoading={isLoading} />
    </Container>
  );
}
