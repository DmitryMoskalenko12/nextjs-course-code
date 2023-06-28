import Head from 'next/head';
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve'/>
      </Head>
      <EventList items={props.events} />
    </Fragment>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
