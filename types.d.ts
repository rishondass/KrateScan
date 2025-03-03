type itemType = {
  id: string,
  name: string,
  quantity: number,
  description: string,
  image: string,
  krateID: string,
}

type krateType = {
  id: string,
  name: string,
  location: string,
  description: string,
  image: string,
  userID: string,
}


type userType = {
  id: string,
  username: string,
  krates: krate[],
}
