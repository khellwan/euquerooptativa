import React, { useState } from 'react';
import { fetchDocument } from 'tripledoc';
import { storageHelper } from '@utils';
import { schema } from 'rdf-namespaces';

export function useCourseList(webId) {
  const [courseList, setCourseList] = useState();

  React.useEffect(() => {
    storageHelper.getAppStorage(webId).then((appPath) => {
      fetchDocument(`${appPath}courses.ttl`).then((courseList) => {
        setCourseList(courseList);
      });
    });
    // const appPath = await storageHelper.getAppStorage(webId);
    // const courseList = await fetchDocument(`${appPath}courses.ttl`);
    // setCourseList(courseList);
  }, []);

  return [courseList, setCourseList];
}

export function getSelectedCourseIndexes(courseListDocument, universityCourses) {
  const courseList = courseListDocument.getSubjectsOfType(schema.Course);
  const courseIndexes = [];
  // For each course the user has interest, look through the university courses to check the checkbox
  // Matching the names because some courses have no code
  courseList.forEach((userCourse) => {
    universityCourses.map((uniCourse, index) => {
      if (uniCourse.courseName == userCourse.getString(schema.description))
        courseIndexes.push(index);
    });
  })
  return courseIndexes;
}
