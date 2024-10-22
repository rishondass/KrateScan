type itemType = {
  id: string,
  name: string,
  location: string,
  description: string,
  image: string,
  krateID: string,
}

type krateType = {
  userID: string,
}


type userType = {
  id: string,
  username: string,
  krates: krate[],
}