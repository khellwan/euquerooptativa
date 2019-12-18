import React, { useState } from 'react';
import { fetchDocument } from 'tripledoc';
import { storageHelper } from '@utils';

export function useCourseList(webId) {
  const [courseList, setCourseList] = useState();

  React.useEffect(() => {
    storageHelper.getAppStorage(webId).then((appPath) => {
        fetchDocument(`${appPath}courses.ttl`).then((courseList) => {
            setCourseList(courseList);
        });
    });
  }, []);

  return [courseList, setCourseList];
}
