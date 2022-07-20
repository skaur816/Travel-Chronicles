const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const client = require('../../Blog/schemas/sanityclient')

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const query = '*[_type == "post"] '
    
    const params={}
    let posts= await client.fetch(query, params) 
      console.log(posts)
   posts = await Promise.all(
      posts.map(async p => {
        const author = await client.getDocument(p.author._ref)
        return {...p, author}
      })
  //  category = await Promise.all(
  //     category.map(async p => {
  //       const category = await client.getDocument(p.category,)
  //       return {...p, category}
  //     })
  //  ) 
   )
    
  console.log(posts)
// TEST FOR IMAGE
// const query = '*[_type == "/image/\"] '
    
//     const params={}
  //   let image= await client.fetch(query, params) 
  //     console.log(posts)
  //  posts = await Promise.all(
  //     posts.map(async p => {
  //       const image = await client.getDocument(p.mainImage)
  //       return {...p, image}
  //     })
  //  )
//TEST FOR IMAGE
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
