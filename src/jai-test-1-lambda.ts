import axios from 'axios';

export const handler = async (event: { [key: string]: any }, context: { [key: string]: any }) => {
  try {
    const response = await axios.get('https://engbsj1ubvyzba2.m.pipedream.net');
    return {
      statusCode: 200,
      body: {
        data: response,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body:{
        error: {
          message: error.message,
          code: error.code
        }
      }
    };
  }
};
