interface Window {
  plausible?: (
    event: string,
    options?: { props?: Record<string, any>; callback?: () => void }
  ) => void & { q?: IArguments[] };
}
