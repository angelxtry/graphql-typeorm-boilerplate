export interface Session {
  userId?: string
}

export interface ResolverMap {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: { session: Session },
      info: any
    ) => any;
  };
}
