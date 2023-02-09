const fetchAPI = async(route, options) => {
    const url = 'https://tcbapi.azurewebsites.net/api/v1';

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

export const updateTimesheetAPI = async(body, id = '*') => {
    let route = `/timesheets/${id === '*' ? body._id : id}`;

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

export const submitTimesheetAPI = async(id) => {
    let route = `/timesheets/submit/${id}`;

    let options = {
        method: 'GET'
    }

    return await fetchAPI(route, options);
}