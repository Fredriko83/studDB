import ORM = require('sequelize');
import {Sequelize} from 'sequelize';
import * as bcryptjs from 'bcryptjs';

export function initEmployeeModel(sequelize: Sequelize) {
  const Employee = sequelize.define('Employee', {
    id: {
      type: ORM.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    lastName: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    phone: {
      type: ORM.STRING,
      allowNull: false
    },
    email: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    facultyId: {
      type: ORM.INTEGER,
      allowNull: false
    },
    profileUrl: {
      type: ORM.STRING,
      allowNull: false
    },
    password: {
      type: ORM.STRING,
      allowNull: false
    }
  }
    , {
      hooks: {
        beforeCreate: (employee: any) => {
          employee.password = bcryptjs.hashSync(employee.password, 8)
        }
      }

      // ,
      // freezeTableName: true,
      // instanceMethods: {
      //     generateHash: function (password) {
      //         bcryptjs.hashSync(password, 8);
      //
      //     },
      //     validPassword: function (password) {
      //         return bcryptjs.compareSync(password, this.password);
      //     },
      // }
    });
  return Employee;
}

export function initEmployeePositionModel(sequelize: Sequelize) {
  return sequelize.define('EmployeePosition', {
    CouncilId: {
      type: ORM.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmployeeId: {
      type: ORM.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    secretary: {
      type: ORM.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    chairman: {
      type: ORM.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    convener: {
      type: ORM.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
}
