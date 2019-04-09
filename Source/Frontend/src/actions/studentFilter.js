const filter = (students) => {
  const output = [];

  students.forEach((student) => {
    const stObj = {};

    Object.keys(student).forEach((key) => {
      const normKey = key.toUpperCase().replace(/ /g,'');
      if (normKey === 'ID') stObj.Id = student[key];
      if (normKey === 'FIRSTNAME') stObj.FirstName = student[key];
      if (normKey === 'MIDDLENAME') stObj.MiddleName = student[key];
      if (normKey === 'LASTNAME') stObj.LastName = student[key];
      if (normKey === 'CREDITHOURS' || normKey === 'EARNEDCRHRS') stObj.CreditHours = parseInt(student[key]);
      if (normKey === 'EMAIL' || normKey === 'E-MAIL' || normKey === 'EMAILADDR') stObj.Email = student[key];
      if (normKey === 'SEX' || normKey === 'GENDER' || normKey === 'ISMALE') {
        const normValue = student[key].toUpperCase();
        if (normValue === 'MALE' || normValue === 'FEMALE') stObj.IsMale = normValue === 'MALE';
        if (normValue === 'M' || normValue === 'F') stObj.IsMale = normValue === 'M';
        if (normKey === 'ISMALE' && (normValue == true || normValue == false)) stObj.IsMale = normValue;
      }
    });

    output.push(stObj);
  });

  return output;
};

export default filter;
