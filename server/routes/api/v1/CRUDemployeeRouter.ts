import {NextFunction, Request, Response, Router} from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {createOne} from '../../../queries/employee/createOne';
// import {deleteOne} from '../../../queries/employee/deleteOne';
import {updateOne} from '../../../queries/employee/updateOne';
import {databaseErrorHandler} from './databaseErrorHandler';
import {EmployeeModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {findOneEmployee} from '../../../queries/findOne';
import { update } from '../../../queries/update';
import {findAllEmployees} from '../../../queries/findAll';

class CRUDemployeeRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * /api/v1/faculties/:id
     *  GET:
     *    description:  Renders the form for updating a snippet.
     *    responses:    200 - If employee is logged in.
     *                  403 - If not logged in.
     *                  404 - If snippet is not found.
     */

    public getAll(req: Request, res: Response, next: NextFunction) {
        findAllEmployees()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find all employees failed'));
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneEmployee(req.params.Id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one employee failed'));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        /*createOne(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create employee`));*/
        create(req.body, EmployeeModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create employee`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        /*deleteOne(req.params.Id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete employee failed'));*/
        deleteOne(req.params.Id, EmployeeModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete employee failed'));
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        /*updateOne(req.params.Id, req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update employee failed'));*/
        update(req.params.Id, req.body, EmployeeModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update employee failed'));
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.patch('/:id', this.patch);
    }
}

export default new CRUDemployeeRouter().router