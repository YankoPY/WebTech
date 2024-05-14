var sql = require('mssql/msnodesqlv8');
var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-2ON7BDC\\SQLEXPRESS;Database=Users;Trusted_Connection=true;'
};
sql.connect(config, err => {
  new sql.Request().query('SELECT * FROM Users', (err, result) => {
    console.log("Select: ");
    if(err) { // SQL error, but connection OK.
      console.log("Connected"+ err);
    } else { 
      console.log(result);
    };
  });
});
sql.on('error', err => { // Connection broken.
  console.log("Wrong select");
  console.log("Error connection"+ err);
});

sql.connect(config, err => {
  new sql.Request().query("INSERT INTO Users(id, username, password) VALUES ('2', 'petq', '00.0054')", (err, result) => {
    console.log("Insert ");
    if(err) { // SQL error, but connection OK.
      console.log("Connected"+ err);
    } else { 
      console.log(result);
    };
  });
});
sql.on('error', err => { // Connection broken.
  console.log("Wrong Insert");
  console.log("Error connection"+ err);
});

sql.connect(config, err => {
  new sql.Request().query("UPDATE Users SET username = 'Stefan' WHERE id = '1' ", (err, result) => {
    console.log("Update:  ");
    if(err) { // SQL error, but connection OK.
      console.log("Connected"+ err);
    } else { 
      console.log(result);
    };
  });
});
sql.on('error', err => { // Connection broken.
  console.log("Wrong Update");
  console.log("Error connection"+ err);
});

sql.connect(config, err => {
  new sql.Request().query('DELETE FROM Users', (err, result) => {
    console.log("Select: ");
    if(err) { // SQL error, but connection OK.
      console.log("Connected"+ err);
    } else { 
      console.log(result);
    };
  });
});
sql.on('error', err => { // Connection broken.
  console.log("Wrong select");
  console.log("Error connection"+ err);
});

