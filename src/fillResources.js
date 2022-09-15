const swapi = require("swapi-node");
const { attributes } = require("./utils");
const Promise = require("bluebird");

const fillResources = async (event) => {
  try {
    const resources = [];
    await swapi
      .get("https://swapi.dev/api/people/")
      .then((result) => {
        resources.push(...result.results);
        return result.nextPage();
      })
      .then((result) => {
        resources.push(...result.results);
        return result.nextPage();
      })
      .then((result) => {
        resources.push(...result.results);
        return result.nextPage();
      })
      .then((result) => {
        resources.push(...result.results);
        return result.nextPage();
      })
      .then((result) => {
        resources.push(...result.results);
        return result.nextPage();
      })
      .catch((err) => {
        return {
          statusCode: 500,
          body: JSON.stringify(
            {
              message: "Something went wrong",
              error: err,
            },
            null,
            2
          ),
        };
      });

    const insertedItems = await Promise.map(resources, async (resource) => {
      const newItem = {};
      Object.keys(resource).forEach(
        (at) => (newItem[attributes[at] ?? at] = resource[at].toString())
      );
      return newItem;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Resources filled in successfully!",
          items: insertedItems,
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
  fillResources,
};
