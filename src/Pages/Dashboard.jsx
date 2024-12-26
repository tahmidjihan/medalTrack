import React from 'react';
import { Helmet } from 'react-helmet-async';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | MedalTrack</title>
      </Helmet>
      <div className='flex gap-4 flex-wrap'>
        <div className='w-full px-10 py-10 max-w-md'>
          <h1 className='text-5xl font-extrabold'>Dashboard</h1>
          <p>
            The Dashboard is your personalized command center, designed to help
            you track and manage your marathon events with ease. From this
            central hub, you can access important updates on upcoming races,
            monitor your registration status, and view event details, including
            dates, locations, and distances. You’ll also have a clear view of
            your progress, including any completed marathons and upcoming events
            you’re registered for. The user-friendly interface allows for quick
            actions, such as updating your registration, viewing results, and
            more. With real-time notifications and seamless navigation, the
            Dashboard ensures you stay on top of your marathon journey.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
