module.exports = function( grunt ) {
 
  grunt.initConfig({
   
    htmlmin: {                                     
	    dist: {                                       
	      options: {                                  
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: [{
	          expand: true,      
	          cwd: 'out/',       
	          src: ['*.html','**/*.html'],  
	          dest: 'out/',    
	      }],
	    }
  	}, // HTMLmin

	imagemin: {                           
	    dist: {                            
	      options: {                       
	        optimizationLevel: 3
	      },
	      files: [{
	          expand: true,      
	          cwd: 'out/',       
	          src: ['**/*.png', '**/*.jpg', '**/*.jpeg'],  
	          dest: 'out/',    
	      }],
	    }
	}, // imageMin
 
  });

  // Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
 
 
  // Tasks runnings
  grunt.registerTask( 'default', ['htmlmin:dist', 'imagemin:dist'] );

};