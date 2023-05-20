import dayjs from "dayjs"

export const countAge = (dateOfBirth: string) => {
  const today = dayjs();
  return today.diff(dateOfBirth, 'year');
}