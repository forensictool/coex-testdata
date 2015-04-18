var DGExt = DGExt || {};

(function() {
    "use strict";

    DGExt.Reviews = function() {

    };

    DGExt.$.extend(DGExt.Reviews.prototype, {
        _reviewsTotalCount: 0,

        /**
         * Init reviews behavior
         * @param firmId
         * @param totalCount
         */
        initComments: function(firmId, totalCount) {
            var self = this;
            this._reviewsTotalCount = totalCount;
            this.initCommentsFolding();
            DGExt.$('.js-gis-more-reviews').click(function() {
                self.loadMoreComments(firmId, DGExt._flampReviewsLoadCount);
            });
            DGExt.$('body').on('reviewsReceived', function(e, data) {
                self._addComments(e, data.reviews, data.disableAnimation);
            });
            this._loadCachedComments(firmId, DGExt._flampReviewsLoadCount);
        },

        /**
         * Init reviews folding
         */
        initCommentsFolding: function() {
            // Init unfolding longer comments
            DGExt.$('.js-message').each(function(i, el) {
                // Minimum height
                var elHeight = DGExt.$(el).find('.js-height');
                // Required height
                var elWrapper = DGExt.$(el).find('.js-wrapper');
                // Link "Read more"
                var elMore = DGExt.$(el).find('.js-more');

                // Read heights from elements
                var height = elHeight.height();
                var wrapperHeight = elWrapper.height();

                // Show the link "Read more"?
                if (height < wrapperHeight) {
                    // Magic fix for different browsers
                    height -= 2;
                    // Set fixed height
                    elHeight.css({
                        'max-height': 'none',
                        'height': height
                    });

                    // Show "Read more" link
                    elMore.show()// Bind "click" event
                        .click(function(e) {
                            e.preventDefault();
                            // If comment is opened
                            if (elMore.hasClass('opened')) {
                                // Animate change height
                                elHeight.stop(true, false).animate({height: height}, 250, function() {
                                    elMore.removeClass('opened').text(DGExt.services.i18n.getMessage('__read_more'));
                                    // Reinit scroll
                                    DGExt.services.view.initPopupScroll(true);
                                });
                            } else {
                                // Animate change height
                                elHeight.stop(true, false).animate({height: wrapperHeight}, 250, function() {
                                    elMore.addClass('opened').text(DGExt.services.i18n.getMessage('__rollup'));
                                    DGExt.$('.scroll-pane').scrollTo(elHeight, 400, {
                                        onAfter: function() {
                                            // Reinit scroll
                                            DGExt.services.view.initPopupScroll(true);
                                        }
                                    });
                                });
                            }
                        });
                }
            });
        },

        /**
         * Load more comments, if exist
         *
         * @param firmId
         * @param count
         */
        loadMoreComments: function(firmId, count) {
            DGExt.$('.js-more-comments').addClass('more-comments-loading');
            kango.invokeAsync('DGExt.services.gis.getFlampReviews', firmId, count, function() {});
        },

        _loadCachedComments: function(firmId, count) {
            kango.invokeAsync('DGExt.services.gis.getCachedFlampReviews', firmId, count, true, function() {});
        },

        /**
         * Reformat response array to fit in template format
         *
         * @param reviews
         * @private
         */
        _reformatReviews: function(reviews) {
            var output = {
                data: {
                    reviews: {
                        flampReviews: []
                    }
                }
            };

            for (var i = 0; i < reviews.length; i++) {
                output.data.reviews.flampReviews.push({
                    reviewRating: parseInt(reviews[i].rating) || 0,
                    reviewAuthorProfileUrl: reviews[i].user.url,
                    reviewAuthor: reviews[i].user.name,
                    reviewDateTime: new Date(Date.parse(reviews[i].date_created)).format(DGExt.services.i18n.getMessage('__DATETIME_FORMAT__')),
                    reviewText: reviews[i].text
                });
            }

            return output;
        },

        /**
         * Callback for comments data population
         *
         * @param e
         * @param reviews
         * @param [_disableAnimation]
         * @private
         */
        _addComments: function(e, reviews, _disableAnimation) {
            if (!reviews || !reviews.length) {
                // hide button
                return;
            }

            var template = Handlebars.compile('{{> reviews_list}}');
            var context = this._reformatReviews(reviews);
            var content = template(context);
            if (_disableAnimation) {
                DGExt.$('.new-comments').removeClass('animated');
            }
            DGExt.$('.js-ext-comments-flamp .new-comments').append(content);
            this.initCommentsFolding();
            DGExt.$('.js-more-comments').addClass('more-comments-expanded');
            DGExt.services.view.initPopupScroll(true);
            if (!_disableAnimation) {
                DGExt.$('.scroll-pane').scrollTo(DGExt.$('.new-comments'), 400);
            }
            DGExt.$('.js-more-comments').removeClass('more-comments-loading');

            if (DGExt.$('.ext-comments .comment').length >= this._reviewsTotalCount) {
                DGExt.$('.js-more-comments').remove();
            }
        }
    });

})();