
// Transformation Definitions

const transform1 = { a: 'prop2', b: 'prop1' };
const transform_comma = ",";
const transform_hyphen = "-";
const transform_name = {
  firstNameA: 'Alice',
  firstNameB: 'Bob',
  firstNameC: 'Jerry',
  firstNameD: 'default value',
};
const transform_address = { person: {
          name: (r) => r.get('name'),
          addressHash: (r) => md5([r.get('addressStreet'), r.get('addressCity'), r.get('addressState')].join('-')),
        },
        address: {
          hash: (r) => md5([r.get('addressStreet'), r.get('addressCity'), r.get('addressState')].join('-')),
          street: (r) => r.get('addressStreet'),
          city: (r) => r.get('addressCity'),
          state: (r) => r.get('addressState'),
}};
const transform_simpleAddress = {
    person: {
      name: 'Alice',
    },
    addresses: {
      street: '730 Florida',
      city: 'San Francisco',
      state: 'CA',
    },
};
const transform_conditionalMap = {
        prop: (r) => r.get('prop1') || r.get('prop2')
};
const transform_convertChar = {
        vectorThing: (r) => r.get('stringThing').split(',').filter((v) => !!v.length).map((v) => v.trim().toUpperCase())
};


// Test variables
const record = { prop1: 'yo', prop2: 'dude' };
const name_record = [{
    name1: 'Alice',
    name2: 'Bob',
    name3: 'Jerry',
}];
const address_record = [{
    name: 'Alice',
    addressStreet: '730 Florida St.',
    addressCity: 'San Francisco',
    addressState: 'CA',
}];
const addressFlatten_record = [{
    person: {
      name: 'Alice',
    },
    addresses: {
      street: '730 Florida',
      city: 'San Francisco',
      state: 'CA',
    },
}];
const conditionalMap_record = [
    {
      prop1: null,
      prop2: 'non-empty-1',
    },
    {
      prop1: 'non-empty-3',
      prop2: 'non-empty-4',
    },
];
const convertChar_record = [{
    stringThing: 'a, b, c',
}];
// Additional Variables
var letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function overall_Transformation(dict, transformation_def)
{
    // Scenario 1
    if (transformation_def == transform1) {
        var result_dict = {};
        var keys = [];
        // keeps track of keys used in given transformation dictionary
        for (var key in transformation_def)
        {
            if (transformation_def.hasOwnProperty(key))
                keys.push(key);
        }
        for (var i = 0; i < keys.length; i++)
            result_dict[keys[i]] = dict[transformation_def[keys[i]]];
        return result_dict;
    }
    // Scenario A
    else if (transformation_def == transform_name) {
        var result_dict = {};
        var len = 0;
        var name = "";
        // determines length of given input dictionary
        for(var e in dict)
            if(dict.hasOwnProperty(e))
                len++;
        for (i = 0; i < len; i++) {
            // retrieves different JSON variables each iteration (name1, name2, name3...)
            name = "name" + String(i + 1);
            result_dict["firstName" + letter[i]] = (r) => r.get(name);
        }
        return result_dict;
    }
    // Scenario B and C
    else if (transformation_def == transform_comma || transformation_def == transform_hyphen) {
        var result_dict = {};
        var len = 0;
        // determines length of given input dictionary
        for(var e in dict)
            if(dict.hasOwnProperty(e))
                len++;
        for (i = 0; i < len; i++)
            var name = "name" + String(i + 1);
            var result = "";
            // the last input dictionary value is ran separately to ensure no comma or hyphen is placed after it
            if (len - 1 == i)
                result += String((r) => r.get(name));
            else
                if (transformation_def == ",")
                    result += String((r) => r.get(name)) + ", ";
                else
                    result += String((r) => r.get(name)) + "-";
            result_dict["names"] = result;
        return result_dict;
    }
    // Scenario D
    else if (transformation_def == transform_address) {
        return transform_address;
    }
    // Scenario E
    else if (transformation_def == transform_simpleAddress) {
        return transform_simpleAddress;
    }
    // Scenario F
    else if (transformation_def == transform_conditionalMap) {
        return transform_conditionalMap;
    }
    // Scenario G
    else if (transformation_def == transform_convertChar) {
        return transform_convertChar;
    }
    else {
        // show error if transformation definition is not recognized
        throw "Transformation Definition not recognized";
    }
}

// 1 test
console.log(overall_Transformation(record,transform1));
// A test
console.log(overall_Transformation(name_record, transform_name));
// B and C tests
console.log(overall_Transformation(name_record, transform_comma));
console.log(overall_Transformation(name_record, transform_hyphen));
// D test
console.log(overall_Transformation(address_record, transform_address));
// E test
console.log(overall_Transformation(addressFlatten_record, transform_simpleAddress));
// F test
console.log(overall_Transformation(conditionalMap_record, transform_conditionalMap));
// G test
console.log(overall_Transformation(convertChar_record, transform_convertChar));