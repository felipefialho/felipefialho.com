module.exports = function( grunt ) {
  
// Paths
var PathConfig = {
	dev: 'src/',
	dist: 'out/'
};

// Set scripts
var scripts = [

	// Jquery 
	'src/**/jquery-1.10.1.js', 

  	// Plugins bootstrap
	'src/**/bootstrap-transition.js', // Transitions (required for any animation)
	'src/**/bootstrap-modal.js', // Modals
	'src/**/bootstrap-collapse.js', // Collapse

	// General starting
	'src/**/_general.js'
]; 

grunt.initConfig({

	// Config path
  	config: PathConfig, 

	// Clean files
  	clean: {
	  dist: [
	  		"<%= config.dist %>/js/bootstrap/**", 
	  		"<%= config.dist %>/js/jquery/**", 
	  		"<%= config.dist %>/js/_general.js"
	  	]
	}, 

	// HTMLmin
	htmlmin: {                                     
	    dist: {                                       
	      options: {                                  
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: [{
	          expand: true,      
	          cwd: '<%= config.dist %>',       
	          src: ['*.html','**/*.html'],  
	          dest: '<%= config.dist %>',    
	      }],
	    }
	}, 
	
	// imageMin
	imagemin: {                           
	    dist: {                            
	      options: {                       
	        optimizationLevel: 3
	      },
	      files: [{
	          expand: true,      
	          cwd: '<%= config.dist %>',       
	          src: ['**/*.png', '**/*.jpg', '**/*.jpeg'],  
	          dest: '<%= config.dist %>',    
	      }],
	    }
	}, 

	// Less
	less: { 
	  dev: {
	    options: {
	      paths: ["<%= config.dev %>files/css/less"]
	    },
	    files: {
	      "<%= config.dev %>files/css/style.css": "<%= config.dev %>files/css/less/style.less"
	    }
	  }
	}, 
 
  	// Uglify
    uglify: {  
		options: {
			mangle : false 
		},                               
	    dev: {   
			files : {
				'<%= config.dev %>js/scripts.min.js': scripts
			}
		}
    },
 
	// Watch 
   	watch : {
   		options: {
      		debounceDelay: 500,
    	},
   		less: {
   			files : [
   				'<%= config.dev %>**/*.less'
   			],
   			tasks : ['less:dev']
   		},
   		js: {
   			files : [
   				'<%= config.dev %>**/js/*.js',
   				'Gruntfile.js'
   			],
   			tasks : ['uglify:dev']
   		} 
	} 
	 

});
 
// Grunt plugins
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');


// Tasks runnings
grunt.registerTask( 'build', ['clean:dist', 'htmlmin:dist', 'imagemin:dist'] );

// Watch
grunt.registerTask( 'w', [ 'watch' ] );

};