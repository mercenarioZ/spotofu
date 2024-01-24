"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = queryString.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder="Type your song name here..."
    />
  );
};

export default SearchInput;
