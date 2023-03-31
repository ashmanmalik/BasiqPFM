var token = process.env.SERVER_ACCESS;
DestroyBulkUsersandtheirLifes(token);

export default function DestroyBulkUsersandtheirLifes(token) {
     fetch("https://au-api.basiq.io/users", {
         headers: { 
             'Authorization': `Bearer ${token}`, 
             'Accept': 'application/json'
           }
     })
     .then(res => res.json())
     .then((res) => {
         console.log(res)
         res.data.forEach((user) => {
            // Fetch User Created date 1 week ago ... 
            var strDate = user.createdTime;
            var isoAPIdate = new Date(strDate).toISOString();
            // Gets Current Date... 
            const current = new Date();
            // Gets One Week Old Date...
                // current.setDate(current.getDate() - 7);
            // Gets One Month Old Date...
            current.setMonth(current.getMonth() - 1);
            // Checks How many users are before 1 Month as Per Jim's comment here: https://basiq-io.slack.com/archives/CR7FCLUQN/p1675390597769379?thread_ts=1675327624.593949&cid=CR7FCLUQN
            if ( isoAPIdate < current.toISOString()) {
                //console.log(user.links.self);
                fetch(`${user.links.self}`, {
                 method: 'DELETE',
                 headers: { 
                     'Authorization': `Bearer ${token}`, 
                     'Accept': 'application/json'
                   }
                 })
            } 
         })
     })
     .then(console.log("done"));
 }