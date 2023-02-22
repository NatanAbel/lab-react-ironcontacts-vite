import "./App.css";
import { useState } from "react";
import Contacts from "./contacts.json";

function compare_name(contact_a, contact_b) {
  return contact_a.name.localeCompare(contact_b.name);
}
function compare_popularity(contact_a, contact_b) {
  return contact_b.popularity - contact_a.popularity;
}

const App = () => {
  const [sort_by, setSort_by] = useState("name");
  const [contacts, setContacts] = useState(Contacts.slice(0, 5));
  const [remContacts, setRemContacts] = useState(Contacts.slice(6))
  console.log("contacts..",contacts);

// Adding a random contact
const getRandom = ()=>{
  console.log("buttonnnnn");
  // Getting a random number of index
  let randomIndex = Math.floor(Math.random() * remContacts.length);
  let randomContact = remContacts[randomIndex];
  console.log("randomContact....",randomContact);
  setContacts([...contacts,randomContact]);
  let filterdContacts = remContacts.filter((oneContact)=> oneContact.name !== randomContact.name)
  
  setRemContacts(filterdContacts);
}
// Sorting contacts by name and popularity using ternary operator to the function given above 
const sortedContacts =[...contacts].sort(
    sort_by === "name" ? compare_name : compare_popularity);

// Deleting contacts by passing the id of the contact to be deleted
const removeContact =(id)=>{  
  const newContact = contacts.filter(contact => contact.id !==id)
  setContacts(newContact)

}
    

  return (
    <div className="App">
      <button onClick={getRandom}>Random</button>
      <button onClick={()=>setSort_by("popularity")}>Sort by popularity</button>
      <button onClick={()=>setSort_by("name")}>Sort by name</button>

      <table>
        <thead>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won<br/>Oscar</th>
          <th>Won<br/>Emmy</th>
          <th>Action</th>
        </thead>
      {sortedContacts.map((contact)=>{
        return(
          
        <tr>
          <td>
            <img
              src={contact.pictureUrl}
              style={{height:"150px"}}
              alt="person"
            />
          </td>
          <td>{contact.name}</td>
          <td>{contact.popularity.toFixed(2)}</td>
          <td>{contact.wonOscar ? "🏆" : ""}</td>
          <td>{contact.wonEmmy ? "🌟" : ""}</td>
          <td><button onClick={()=>removeContact(contact.id)}>Delete</button></td>
        </tr>
      
        )
      })}
      </table>
    </div>
  );
};
export default App;