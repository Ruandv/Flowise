import express from 'express'
import chatflowsController from '../../controllers/chatflows'
import { checkAnyPermission, checkPermission } from '../../enterprise/rbac/PermissionCheck'

// Validation middleware for query parameters
const validateChatflowQuery = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { type } = req.query

    // Validate type parameter if provided
    if (type && !['CHATFLOW', 'MULTIAGENT', 'ASSISTANT', 'AGENTFLOW'].includes(type as string)) {
        return res.status(400).json({
            error: 'Invalid type parameter',
            message: 'Type must be one of: CHATFLOW, MULTIAGENT, ASSISTANT, AGENTFLOW'
        })
    }

    next()
}

const router = express.Router()

// CREATE
router.post('/', checkAnyPermission('chatflows:create,chatflows:update'), chatflowsController.saveChatflow)
router.post('/importchatflows', checkPermission('chatflows:import'), chatflowsController.importChatflows)

// READ - Add validation middleware here
router.get('/', validateChatflowQuery, checkAnyPermission('chatflows:view,chatflows:update'), chatflowsController.getAllChatflows)
router.get(['/', '/:id'], checkAnyPermission('chatflows:view,chatflows:update,chatflows:delete'), chatflowsController.getChatflowById)
router.get(['/apikey/', '/apikey/:apikey'], chatflowsController.getChatflowByApiKey)

// UPDATE
router.put(['/', '/:id'], checkAnyPermission('chatflows:create,chatflows:update'), chatflowsController.updateChatflow)

// DELETE
router.delete(['/', '/:id'], checkPermission('chatflows:delete'), chatflowsController.deleteChatflow)

// CHECK FOR CHANGE
router.get('/has-changed/:id/:lastUpdatedDateTime', chatflowsController.checkIfChatflowHasChanged)

export default router
