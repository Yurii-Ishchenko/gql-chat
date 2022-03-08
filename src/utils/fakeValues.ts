export const fakeObjMessageA = {
  id: "id-1",
  description:
    "For example, you can use this to switch back to a cache-first fetch policy after using cache-and-network or network-only for a single execution.",
  userId: "319",
  convId: "id-1",
  date: "2022-02-02T14:01:59.276Z",
  user: {
    id: "319",
    login: "Valick",
    email: "valick@gmail.com",
    avatar: "https://i1.sndcdn.com/artworks-000066575722-kts3eo-t500x500.jpg",
  },
};

export const fakeObjMessageB = {
  id: "id-2",
  description:
    "Deprecated. If true, causes a query refetch if the query result is detected as partial. Setting this option is unnecessary in Apollo Client 3, thanks to a more consistent application of fetch policies. It might be removed in a future release. JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error ",
  userId: "325",
  convId: "id-1",
  date: "2022-02-02T14:01:59.276Z",
  user: {
    id: "325",
    login: "Vitalick",
    email: "vitalick@gmail.com",
    avatar:
      "https://www.meme-arsenal.com/memes/46a63654d0350c745ba94017aca544dd.jpg",
  },
};

export const fakeProviderValue = {
  user: {
    id: "319",
    login: "Valick",
    email: "valick@gmail.com",
    avatar: "https://i1.sndcdn.com/artworks-000066575722-kts3eo-t500x500.jpg",
  },
  logOutUser: jest.fn(),
  setToken: jest.fn(),
  setUser: jest.fn(),
  activeConvId: 0,
  setActiveConvId: jest.fn(),
  loading: false,
};
