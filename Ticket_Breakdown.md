# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### `Ticket #1 Update Backend to add customIds feature for Agents`
The first step to allow <i>Facilties</i> to add custom <i>ids</i> to <i>Agents</i> assigned to them is to add a new database table to keep track of custom ids assigned to agents. The name of the table will be called *FacilityAgents* and and for each record will have 3 fields: 

- agentId *(internal database id from Agents table)*
- facilityId *(internal database id from Facility table )*
- customId *(Custom id assigned to the agent)*
  
The key for each record in this table will be a composite key of the agentId and facilityId.

A new api endpoint `POST /facility-agent` should then be created to create new customIds for agents attached to Facilities. The endpoint should take *facilityId*, *agentId* and *customId* as parameters and create a new record in the *FacilityAgents* table.

This should take a maximum of 1 hour to be done.

### `Ticket #2 Update the application frontend`  
Once the new endpoint is ready, the frontend should be updated with a new view that will allow a Facility to add a new customId to an agent. Assuming there is already a Facility dashboard with a view listing all agents assigned to the facility in a tabular fashion, an 'ASSIGN CUSTOM ID' button will be addeed to each agent's row and on clicking the button, an input field should be displayed to the faciiity admin to let them type in their customId. Once they're done editing and hit submit, the application should send then call the `POST /facility-agent` endpoint with facilityId, agentId and customId as parameters.

This should take at most 40 minutes.

### `Ticket #3 Update getShiftsByFacility  and generateReport methods`
The final step is to update the getShiftsByFacility method, so that for each shift, the function will check if there's a customId assigned to the agent booked for the shift. If agent has a customId, then it will be added to the agent's metadata returned by this function. Otherwise, only the internal database id will be included in the metadata. The generateReport method will also be updated to include the customId in its output.

This should take at most 40 minutes