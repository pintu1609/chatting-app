import React, { useState } from "react";
import "./createGroupModal.css";

const CreateGroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [members, setMembers] = useState([]);

  const allUsers = ["Alice", "Bob", "Charlie", "David", "Eva"]; // example members

  const handleSubmit = () => {
    const groupData = {
      groupName,
      description,
      imageURL,
      members,
    };
    console.log("Group created:", groupData);
    onClose(); // close modal after submit
  };

  return (
    <div className="modal-overlay">
      <div className="create-group-modal">
        <h2>Create Group</h2>
        
        <label>Group Image</label>
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="group-input"
          placeholder="Paste image URL"
        />
        <label>Group Name</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="group-input"
          placeholder="Enter group name"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="group-input"
          placeholder="Enter description"
        />

        

        <label>Members</label>
        <select
          multiple
          value={members}
          onChange={(e) =>
            setMembers(Array.from(e.target.selectedOptions, (opt) => opt.value))
          }
          className="group-input"
        >
          {allUsers.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button onClick={onClose} className="btn cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn create">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
