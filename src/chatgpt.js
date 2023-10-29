import React from 'react'

// state = {
//     selectedId: '1', // Default selected id
//     data: [
//       { id: '1', name: 'Option 1' },
//       { id: '2', name: 'Option 2' },
//       { id: '3', name: 'Option 3' },
//     ],
//   };

const chatgpt = () => {

    

      const { selectedId, data } = this.state;

    // Filter the options for the second select based on the selectedId
    const filteredOptions = data.filter((item) => item.id === selectedId);

  return (
    <div>
        <select
          value={selectedId}
          onChange={(event) => {
            this.setState({ selectedId: event.target.value });
          }}
        >
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select>
          {filteredOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
    </div>
  )
}

export default chatgpt