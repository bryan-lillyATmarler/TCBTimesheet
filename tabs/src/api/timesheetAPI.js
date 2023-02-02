const fetchAPI = async(route, options) => {
    const url = 'http://localhost:5000/api/v1';

    let response;

    await fetch(`${url}${route}`, options)
        .then(res => res.json())
        .then(data => {
            response = data
        });

    return response
}

export const getTimesheetAPI = async(timesheetID) => {
   let route = `/timesheets/${timesheetID}`;

   let options = {
        method: 'GET'
   }

   return await fetchAPI(route, options);
}

export const createTimesheetAPI = async(body) => {
    let route = '/timesheets';

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return await fetchAPI(route, options);
}

export const updateTimesheetAPI = async(body) => {
    let route = `/timesheets/${body._id}`;

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return await fetchAPI(route, options);
}

export const deleteTimesheetAPI = () => {
    
}

export const availableTimesheetAPI = async(username) => {
    let route = `/timesheets/available?username=${username}`;

    let options = {
        method: 'GET',
    }

    return await fetchAPI(route, options);
}