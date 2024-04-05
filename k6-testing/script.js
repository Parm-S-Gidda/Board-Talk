import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  duration: '8s',

  thresholds: {
    http_req_duration: ['p(99)<600'],
  }

  // The following section contains configuration options for execution of this
  // test script in Grafana Cloud.
  //
  // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
  // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
  //
  // cloud: {
  //   // The ID of the project to which the test is assigned in the k6 Cloud UI.
  //   // By default tests are executed in default project.
  //   projectID: "",
  //   // The name of the test in the k6 Cloud UI.
  //   // Test runs with the same name will be grouped.
  //   name: "script.js"
  // },

  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {

  // test pings
  let res = http.get('https://cmpt-474.xyz/api/users/ping');
  check(res, {"User ping successful" : (resp) => resp.status === 200});
  check(JSON.parse(res.body).message, {"User ping correct message": (resp) => resp === "works"});
  sleep(0.1);

  res = http.get('https://cmpt-474.xyz/api/questions/ping');
  check(res, {"Question ping successful" : (resp) => resp.status === 200});
  check(JSON.parse(res.body).message, {"Question ping correct message": (resp) => resp === "works"});
  sleep(0.1);

  // test login and keep auth token for the rest of the API calls
  let body = {
    "email" : "vincivelasco@gmail.com",
    "password": "Hello123#",
  }

  res = http.post('https://cmpt-474.xyz/api/users/login', JSON.stringify(body), {
    headers : {'Content-Type': 'application/json'}
  });
  check(res, {"Login successful" : (resp) => resp.status === 200});

  let res_body = JSON.parse(res.body);
  const user_id = res_body.user_id;
  const accessToken = res_body.accessToken;
  sleep(0.5);

  // test get requests for questions
  res = http.get('https://cmpt-474.xyz/api/questions', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  check(res, {"Get questions successful" : (resp) => resp.status === 200});

  res_body = JSON.parse(res.body);
  sleep(0.5);

  // if there as at least 1 question, test a single get answer request
  if (Object.keys(res_body).length > 0) {
    const question_id = JSON.parse(res.body)[0].question_id;
    res = http.get('https://cmpt-474.xyz/api/questions', {
      params: question_id,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    check(res, {"Get answers successful" : (resp) => resp.status === 200});
  }

  sleep(0.5);

  //  *COMMENT OUT this section if you don't to do post requests as part of the testing*
  // ------------------------------------------------------------------------------------------
  // test question post request
  body = {
    "user_id" : user_id,
    "title" : "",
    "content": "This is a test as part of k6!",
  }

  res = http.post('https://cmpt-474.xyz/api/questions', JSON.stringify(body), {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  check(res, {"Post question successful" : (resp) => resp.status === 201});

  const question_id = JSON.parse(res.body).question_id;
  sleep(0.5);

  // test answer post request
  body = {
    "user_id" : user_id,
    "question_id" : question_id,
    "content": "This is a test as part of k6!",
  }

  res = http.post('https://cmpt-474.xyz/api/answers', JSON.stringify(body), {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  check(res, {"Post answer successful" : (resp) => resp.status === 201});
  // ------------------------------------------------------------------------------------------


  sleep(0.2);
  // test logout
  res = http.post('https://cmpt-474.xyz/api/users/logout', {}, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  check(res, {"Logout successful" : (resp) => resp.status === 200});


  sleep(1);
}
