type bool = boolean | undefined;
type elem = Element | null;
type defString = string | undefined;

type Card = {
  image: string, 
  title: string, 
  translation: string,
  song: string,
  status?: bool,
  main?: bool,
  name?: defString
}

export {bool, elem, Card, defString};