import React, { useState } from 'react';
import { schema } from 'rdf-namespaces';
import { useCourseList } from '@hooks/useCourseList';

export function useCourseIndexes(webId, universityCourses) {
  const [courseListDocument, setCourseListDocument] = useCourseList(webId);
  const [courseIndexes, setCourseIndexes] = useState([]);

  React.useEffect(() => {
    if (courseListDocument == null) return;
    const courseList = courseListDocument.getSubjectsOfType(schema.Course);
    const newCourseIndexes = [];

    // For each course the user has interest, look through the university courses to check the checkbox
    // Matching the names because some courses have no code
    courseList.forEach((userCourse) => {
      universityCourses.map((uniCourse, index) => {
        if (uniCourse.courseName == userCourse.getString(schema.description))
          newCourseIndexes.push(index);
      });
    })
    setCourseIndexes(newCourseIndexes);
  },[courseListDocument]);

  return [courseIndexes, setCourseIndexes];
}