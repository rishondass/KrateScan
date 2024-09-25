type itemType = {
  id: string,
  name: string,
  location: string,
  description: string,
  image: string,
}

type krateType = itemType & {
  items: item[],
  userID: string,
}


type userType = {
  id: string,
  username: string,
  krates: krate[],
}