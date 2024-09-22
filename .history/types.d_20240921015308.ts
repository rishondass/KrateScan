type item = {
  id?: string,
  name: string,
  location: string,
  description: string,
  image: string,
}

type krate = item & {
  items: item[],
}


type userType = {
  id: string,
  username: string,
  krates: krate[],
}