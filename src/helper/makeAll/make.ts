const fs = require('fs');
const path = require('path');

function makeFiles(
  folderName: string,
  name: string,
  props: object,
  createDto: object = {},
  updateDto: object = {},
) {
  createDto =
    createDto ||
    Object.fromEntries(Object.entries(props).map((i) => [i[0], i[1][0]]));

  // ALL FUNCTIONS
  let mkDir = path.resolve(__dirname, '..', '..', folderName);
  let readFromExample = (name: string) => {
    return fs
      .readFileSync(path.resolve(__dirname, 'example', name), 'utf8')
      .toString();
  };
  let replaceName = (content: string) => {
    let splitContent = content.split('\n');
    for (let i in splitContent) {
      if (splitContent[i].includes('import')) {
        splitContent[i] = splitContent[i].replace(/example./, folderName + '.');
      }
    }
    content = splitContent.join('\n');
    content
      .replace(/example/g, name[0].toLowerCase() + name.slice(1, name.length))
      .replace(/Example/g, name);
    return content;
  };

  let writeProps = (content: string) => {
    let propsArea: string = '';
    for (let i in props) {
      propsArea += `@Prop(${props[i][1]})\n\t${i}:${props[i][0]};\n\n\t`;
    }
    return content.replace(/'props'/, propsArea);
  };

  let writeCreateDto = (content: string) => {
    let propsArea: string = '';
    for (let i in createDto) {
      propsArea += `${i}: ${createDto[i]};\n\t`;
    }
    return content.replace(/'dto'/, propsArea);
  };

  let writeUpdateDto = (content: string) => {
    let propsArea: string = '';
    let dto = updateDto || createDto;
    for (let i in dto) {
      propsArea += `${i}?: ${dto[i]};\n\t`;
    }
    return content.replace(/'dto'/, propsArea);
  };

  // FUNTIONS END

  try {
    fs.mkdirSync(mkDir);
  } catch (error) {
    console.log('Folder is already created.');
  }
  let controller = readFromExample('example.controller.ts');
  let module = readFromExample('example.module.ts');
  let service = readFromExample('example.service.ts');
  let schema = readFromExample('schemas/example.schema.ts');
  let createDtoFile = readFromExample('dto/create-example.dto.ts');
  let updateDtoFile = readFromExample('dto/update-example.dto.ts');

  // CREATE CONTROLLER FILE
  try {
    fs.writeFileSync(
      mkDir + `/${folderName}.controller.ts`,
      replaceName(controller),
    );
    console.log('Controller created');
  } catch (error) {
    console.log('Controllerda Yozishda xatolik');
  }

  // CREATE SERVICE FILE
  try {
    fs.writeFileSync(mkDir + `/${folderName}.service.ts`, replaceName(service));
    console.log('Service created');
  } catch (error) {
    console.log('Service Yozishda xatolik');
  }

  // CREATE MODULE FILE
  try {
    fs.writeFileSync(mkDir + `/${folderName}.module.ts`, replaceName(module));
    console.log('Module created');
  } catch (error) {
    console.log('Module Yozishda xatolik');
  }

  // CREATE SCHEMA
  try {
    try {
      fs.mkdirSync(mkDir + '/schemas');
      console.log('Schema created');
    } catch (error) {
      console.log('Schema Papka oldin bor edi.');
    }
    fs.writeFileSync(
      mkDir + `/schemas/${folderName}.schema.ts`,
      writeProps(replaceName(schema)),
    );
    console.log('Schema created');
  } catch (error) {
    console.log('Schema Yozishda xatolik');
  }

  // CREATE DTO FOLDER
  try {
    fs.mkdirSync(mkDir + '/dto');
    console.log('Dto created');
  } catch (error) {
    console.log('Dto Papka oldin bor edi.');
  }

  // CREATE CREATEDTO FILE
  try {
    fs.writeFileSync(
      mkDir + `/dto/create-${folderName}.dto.ts`,
      writeCreateDto(replaceName(createDtoFile)),
    );
    console.log('CreateDto created');
  } catch (error) {
    console.log('CreateDto Yozishda xatolik');
  }

  // CREATE UPDATEDTO FILE
  try {
    fs.writeFileSync(
      mkDir + `/dto/update-${folderName}.dto.ts`,
      writeUpdateDto(replaceName(updateDtoFile)),
    );
    console.log('UpdateDto created');
  } catch (error) {
    console.log('UpdateDto Yozishda xatolik');
  }
}

// SPEC SERVICE
makeFiles('spec-service', 'SpecService', {
  spec_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' }]",
  ],
  service_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]",
  ],
  spec_service_price: ['string', ''],
});

// SERVICE
makeFiles('service', 'Service', {
  service_name: ['string', '{ required: true }'],
  service_price: ['string', '{ required: true }'],
});

// QUEUE
makeFiles('queue', 'Queue', {
  spec_service_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }]",
  ],
  client_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }]",
  ],
  queue_date_time: ['string', '{ required:true }'],
  queue_number: ['number', '{ required:true }'],
});

// QUEUE
makeFiles(
  'client',
  'Client',
  {
    client_last_name: ['string', ''],
    client_first_name: ['string', ''],
    client_phone_number: ['string', '{ required:true }'],
    client_info: ['string', ''],
    client_photo: ['string', ''],
    client_is_active: ['boolean', ''],
    otp_id: [
      'mongoose.Schema.Types.ObjectId',
      "[{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }]",
    ],
  },
  { client_phone_number: ['string', '{ required:true }'] },
);

// OTP
makeFiles('otp', 'Otp', {
  otp: ['string', ''],
  expiration_time: ['number', ''],
  verified: ['boolean', ''],
});

// SPEC WORKING TIME
makeFiles('spec-working-day', 'SpecWorkingDay', {
  spec_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }]",
  ],
  day_of_week: ['number', ''],
  start_time: ['string', ''],
  finish_time: ['string', ''],
  rest_start_time: ['string', ''],
  rest_finish_time: ['string', ''],
});

// TOKEN
makeFiles('token', 'Token', {
  table_name: ['string', ''],
  user_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }]",
  ],
  user_os: ['string', ''],
  user_device: ['string', ''],
  token: ['string', ''],
});

// ADMIN
makeFiles('admin', 'Admin', {
  table_name: ['string', ''],
  user_id: [
    'mongoose.Schema.Types.ObjectId',
    "[{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }]",
  ],
  user_os: ['string', ''],
  user_device: ['string', ''],
  token: ['string', ''],
});

