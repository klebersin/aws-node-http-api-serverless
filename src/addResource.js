const AWS = require("aws-sdk");

const addResource = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {
      nombre,
      altura,
      masa,
      color_cabello,
      color_piel,
      color_ojos,
      anio_nacimiento,
      genero,
      mundo_origen,
      peliculas,
      especies,
      vehiculos,
      naves_espaciales,
      creado,
      editado,
      url,
    } = JSON.parse(event.body);

    const newResource = {
      nombre,
      altura,
      masa,
      color_cabello,
      color_piel,
      color_ojos,
      anio_nacimiento,
      genero,
      mundo_origen,
      peliculas,
      especies,
      vehiculos,
      naves_espaciales,
      creado,
      editado,
      url,
    };

    await dynamodb
      .put({
        TableName: process.env.TABLE_NAME,
        Item: newResource,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Resource created successfully!",
          item: newResource,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Something went wrong",
          error: error,
        },
        null,
        2
      ),
    };
  }
};

module.exports = {
  addResource,
};
