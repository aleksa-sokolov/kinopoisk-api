import { GetServerSidePropsResult } from 'next';
import { IPeople, IPeopleResponse } from '@/types/IPeople';
import { AxiosResponse } from 'axios';
import { getHttpDirector } from '@/http/index';
import PeoplePage from '@/pages/PeoplePage/PeoplePage';

export async function getServerSideProps(ctx: any): Promise<GetServerSidePropsResult<IPeopleResponse>> {
  const idPeople: number = ctx.params.id;
  const people: AxiosResponse<IPeople> = await getHttpDirector.get(`/staff/${idPeople}`);
  console.log(people.data);
  return {
    props: {
      people: people.data,
    },
  };
}

export default function La(props: IPeopleResponse) {
  return (
    <PeoplePage {...props} />
  );
}
